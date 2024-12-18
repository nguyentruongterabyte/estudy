import questionService from '../services/questionService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';
import questionBundleService from '../services/questionBundleService';
import testService from '../services/testService';

const handleSaveTest = async (req, res) => {
  const { name, partId, grammarId, questions } = req.body;

  try {
    const questionGroupData = { name };

    if (partId) {
      questionGroupData.partId = partId;
    }

    if (grammarId) {
      questionGroupData.grammarId = grammarId;
    }

    // Create questionGroup
    const newQuestionGroup = await questionGroupService.save(questionGroupData);

    // Create new questions with group id
    const newQuestions = [];
    for (const question of questions) {
      // Save question
      const { id, photoId, audioId, ...questionWithoutId } = question;
      const newQuestion = await questionService.save({ ...questionWithoutId, groupId: newQuestionGroup.id });

      const newAnswers = [];
      for (const [index, answer] of question.answers.entries()) {
        const { id, ...answerWithoutId } = answer;
        const newAnswer = await answerService.save({ questionId: newQuestion.id, ...answerWithoutId });

        // Save correct answer if index of answer equals correct answer index
        if (index === question.correctAnswerIndex) {
          await correctAnswerService.save({
            questionId: newQuestion.id,
            answerId: newAnswer.id,
            explain: question?.correctAnswer?.explain || '',
          });
        }

        newAnswers.push({ ...newAnswer.dataValues, index });
      }

      newQuestions.push({
        ...newQuestion.dataValues,
        answers: newAnswers,
        correctAnswerIndex: question.correctAnswerIndex,
      });
    }

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        questionGroup: newQuestionGroup,
        questions: newQuestions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleSaveBundleTest = async (req, res) => {
  const { name, partId, bundles } = req.body;

  try {
    // Create questionGroup
    const newQuestionGroup = await questionGroupService.save({
      name,
      partId,
    });

    // Create new question bundles with group id
    const newQuestionBundles = [];
    for (const bundle of bundles) {
      const { id, photoId, audioId, ...bundleWithoutId } = bundle;

      const newBundle = await questionBundleService.save({
        ...bundleWithoutId,
        questionGroupId: newQuestionGroup.id,
        bundleId: bundle.id,
      });

      const questions = bundle.questions;
      const newQuestions = [];

      for (const question of questions) {
        // Save question
        const { id, photoId, audioId, ...questionWithoutId } = question;
        const newQuestion = await questionService.save({
          ...questionWithoutId,
          groupId: newQuestionGroup.id,
          bundleId: newBundle.id,
        });

        // Save answers
        const newAnswers = [];
        for (const [index, answer] of question.answers.entries()) {
          const { id, ...answerWithoutId } = answer;
          const newAnswer = await answerService.save({ questionId: newQuestion.id, ...answerWithoutId });

          // Save correct answer if index of answer equals correct answer index
          if (index === question.correctAnswerIndex) {
            await correctAnswerService.save({
              questionId: newQuestion.id,
              answerId: newAnswer.id,
              explain: question?.correctAnswer?.explain || '',
            });
          }

          newAnswers.push({ ...newAnswer.dataValues, index });
        }

        newQuestions.push({
          ...newQuestion.dataValues,
          answers: newAnswers,
          correctAnswerIndex: question.correctAnswerIndex,
        });
      }

      newQuestionBundles.push({ ...newBundle.dataValues, questions: newQuestions });
    }

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        questionGroup: newQuestionGroup,
        questionBundles: newQuestionBundles,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleteTest = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    // find question group
    const questionGroup = await questionGroupService.get(groupId);
    if (!questionGroup)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Question group not found',
      });

    // get questions by group id
    const questions = await questionService.getByGroupId(groupId);

    const photos = await Promise.all(
      questions.filter((q) => q.photoId != null).map(async (question) => await photoService.get(question.photoId)),
    ); // get photos by question id array
    const audios = await Promise.all(
      questions.filter((q) => q.audioId != null).map(async (question) => await audioService.get(question.audioId)),
    ); // get audios by question id

    await Promise.all(
      photos.map(async (photo) => {
        await photoService.deleteFirebasePhotoByUrl(photo.filePath); // delete photo from firebase
        await photoService.destroy(photo.id);
      }),
    );

    // handle delete audio
    await Promise.all(
      audios.map(async (audio) => {
        await audioService.deleteFirebaseAudioByUrl(audio.audioLink); // Delete audio from firebase
        await audioService.destroy(audio.id); // Delete audio from db
      }),
    );

    await questionGroupService.destroy(groupId);
    return res.json({
      errCode: 0,
      errMessage: 'Delete successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleleBundleTest = async (req, res) => {
  const { groupId } = req.params;
  if (!groupId)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });

  try {
    // find question group
    const questionGroup = await questionGroupService.get(groupId);
    if (!questionGroup)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Question group not found',
      });

    // get bundles by group id
    const questionBundles = await questionBundleService.getByGroupId(groupId);

    const photos = await Promise.all(
      questionBundles.filter((q) => q.photoId != null).map(async (bundle) => await photoService.get(bundle.photoId)),
    ); // get photos by question id array

    const audios = await Promise.all(
      questionBundles.filter((q) => q.audioId != null).map(async (bundle) => await audioService.get(bundle.audioId)),
    ); // get audios by question id

    await Promise.all(
      photos.map(async (photo) => {
        await photoService.deleteFirebasePhotoByUrl(photo.filePath); // delete photo from firebase
        await photoService.destroy(photo.id);
      }),
    );

    // handle delete audio
    await Promise.all(
      audios.map(async (audio) => {
        await audioService.deleteFirebaseAudioByUrl(audio.audioLink); // Delete audio from firebase
        await audioService.destroy(audio.id); // Delete audio from db
      }),
    );

    await questionGroupService.destroy(groupId);
    return res.json({
      errCode: 0,
      errMessage: 'Delete successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

// handle get user answer
const handleGetUserAnswers = async (req, res) => {
  const { userId, groupId } = req.params;

  if (!userId || !groupId)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });

  try {
    const userAnswers = await testService.getUserAnswers(userId, groupId);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: userAnswers,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleSaveTest,
  handleDeleteTest,
  handleSaveBundleTest,
  handleDeleleBundleTest,
  handleGetUserAnswers,
};

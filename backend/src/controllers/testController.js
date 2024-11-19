import questionService from '../services/questionService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';

const handleSaveTest = async (req, res) => {
  const { name, partId, questions } = req.body;

  try {
    // Create questionGroup
    const newQuestionGroup = await questionGroupService.save({
      name,
      partId,
    });

    // Create new questions with group id
    const newQuestions = await Promise.all(
      questions.map(async (question) => {
        // Save question
        const { id, photoId, audioId, ...questionWithoutId } = question;
        const newQuestion = await questionService.save({ ...questionWithoutId, groupId: newQuestionGroup.id });

        // save answers
        const newAnswers = await Promise.all(
          question.answers.map(async (answer, index) => {
            const { id, ...answerWithoutId } = answer;
            const newAnswer = await answerService.save({ questionId: newQuestion.id, ...answerWithoutId });

            // save correct answer if index of answer equals correct answer index
            if (index === question.correctAnswerIndex) {
              await correctAnswerService.save({ questionId: newQuestion.id, answerId: newAnswer.id });
            }
            return { ...newAnswer.dataValues, index };
          }),
        );

        return { ...newQuestion.dataValues, answers: newAnswers, correctAnswerIndex: question.correctAnswerIndex };
      }),
    );

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

    // remove audios with duplicate `id`
    const uniquePhotos = Array.from(new Map(photos.map((photo) => [photo.id, photo])).values());
    const uniqueAudios = Array.from(new Map(audios.map((audio) => [audio.id, audio])).values());

    await Promise.all(
      uniquePhotos.map(async (photo) => {
        await photoService.deleteFirebasePhotoByUrl(photo.filePath); // delete photo from firebase
        await photoService.destroy(photo.id);
      }),
    );

    // handle delete audio
    await Promise.all(
      uniqueAudios.map(async (audio) => {
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

module.exports = {
  handleSaveTest,
  handleDeleteTest,
};

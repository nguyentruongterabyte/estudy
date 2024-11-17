import questionService from '../services/questionService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';

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

    // // delete photo from firebase
    if (questionGroup.partId === 1) {
      // get photos by question id array
      const photos = await Promise.all(
        questions.map(async (question) => await photoService.getByQuestionId(question.id)),
      );

      await Promise.all(photos.map(async (photo) => await photoService.deleteFirebasePhotoByUrl(photo.filePath)));
    }

    // handle delete audio
    const audios = await Promise.all(
      questions.map(async (question) => await audioService.getByQuestionId(question.id)),
    ); // get audios by question id

    const uniqueAudios = Array.from(
      new Map(audios.filter((audio) => audio != null).map((audio) => [audio.id, audio])).values(),
    ); // remove audios with duplicate `id`

    // Delete audio from firebase
    await Promise.all(uniqueAudios.map(async (audio) => await audioService.deleteFirebaseAudioByUrl(audio.audioLink)));

    // Delete audio from db
    await Promise.all(uniqueAudios.map(async (audio) => await audioService.destroy(audio.id)));

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

const handleSaveTest = async (req, res) => {
  const { name, partId, questions } = req.body;

  try {
    const newQuestionGroup = await questionGroupService.save({ name, partId });
    // Create questions
    const newQuestions = await Promise.all(
      questions.map(async (question) => {
        const answers = question.answers;
        const correctAnswerIndex = question.correctAnswerIndex;
        let newQuestion;
        if (partId === 1) {
          const correctAnswer = answers.find((item) => item.id === correctAnswerIndex);
          newQuestion = await questionService.save({ question: correctAnswer.answer, groupId: newQuestionGroup.id });
        } else {
          newQuestion = await questionService.save({ question: question.question, groupId: newQuestionGroup.id });
        }

        return newQuestion;
      }),
    );

    // create answers
    const questionsWithAnswers = await Promise.all(
      newQuestions.map(async (question, index) => {
        const answers = questions[index].answers;

        const newAnswers = [];

        for (const answer of answers) {
          const newAnswer = await answerService.save({ questionId: question.id, answer: answer.answer });
          newAnswers.push(newAnswer);
        }

        return { ...question.dataValues, answers: newAnswers };
      }),
    );

    // Create correct answer
    const questionsWithCorrectAnswers = await Promise.all(
      questionsWithAnswers.map(async (question, index) => {
        const correctAnswerIndex = questions[index].correctAnswerIndex;
        const answers = question.answers;
        const correctAnswer = answers[correctAnswerIndex];
        const newCorrectAnswer = await correctAnswerService.save({
          questionId: question.id,
          answerId: correctAnswer.id,
        });
        return { ...question, correctAnswer: newCorrectAnswer };
      }),
    );

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        questionGroup: newQuestionGroup,
        questions: questionsWithCorrectAnswers,
      },
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

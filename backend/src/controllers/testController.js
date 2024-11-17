import questionService from '../services/questionService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';


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
};

import userAnswerService from '../services/userAnswerService';
import userService from '../services/userService';
import questionService from '../services/questionService';
import answerService from '../services/answerService';

const handleCreateUserAnswer = async (req, res) => {
  const { userId, questionId, answerId } = req.params;

  try {
    const user = await userService.getById(userId);
    if (!user)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'User not found',
      });
    const question = await questionService.get(questionId);
    if (!question)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Question not found',
      });

    const answer = await answerService.get(answerId);
    if (!answer)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Answer not found',
      });

    const newUserAnswer = await userAnswerService.save({
      userId,
      questionId,
      answerId,
    });
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newUserAnswer,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleteUserAnswers = async (req, res) => {
  const { userAnswers } = req.body;
  const { id } = req.params;
  try {
    await Promise.all(userAnswers.map(async (ua) => await userAnswerService.destroy(id, ua.questionId)));
    res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleCreateUserAnswer,
  handleDeleteUserAnswers,
};

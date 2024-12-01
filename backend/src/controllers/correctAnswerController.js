import correctAnswerService from '../services/correctAnswerService';

const handleUpdateManyByQuestionId = async (req, res) => {
  const { correctAnswers } = req.body;

  try {
    await correctAnswerService.updateManyByQuestionId(correctAnswers);
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
  handleUpdateManyByQuestionId,
};

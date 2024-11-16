import answerService from '../services/answerService';

const handleUpdateAnswers = async (req, res) => {
  const { answers } = req.body;

  if (!answers)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });

  try {
    await answerService.updateAnswers(answers);
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
  handleUpdateAnswers,
};

import analyticService from '../services/analyticService';

const handleGetAverageTimePerDay = async (_, res) => {
  try {
    const averageTimes = await analyticService.getAverageTimePerDay();
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: averageTimes,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetTopUsersByPartId = async (req, res) => {
  const { partId, topUsers } = req.params;
  try {
    const users = await analyticService.getTopUsersByPartId(partId, topUsers);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetTopUsersByGrammarId = async (req, res) => {
  const { grammarId, topUsers } = req.params;
  try {
    const users = await analyticService.getTopUsersByGrammarId(grammarId, topUsers);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

// handle get correct answer percentage by grammars
const handleGetCorrectAnswerPercentageByGrammars = async (req, res) => {
  const { userId } = req.params;
  try {
    const percentage = await analyticService.getCorrectAnswerPercentageByGrammars(userId);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: percentage,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

// handle get correct answer percentage by parts (ids)
const handleGetCorrectAnswerPercentageByParts = async (req, res) => {
  const { userId } = req.params;
  const { partIds } = req.body;

  try {
    const percentage = await analyticService.getCorrectAnswerPercentageByParts(partIds, userId);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: percentage,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

// handle get vocabulary learning percentage
const handleGetVocabularyLearningPercentage = async (req, res) => {
  const { userId, status } = req.params;
  try {
    const percentage = await analyticService.getVocabularyLearningPercentage(userId, status);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: percentage,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleGetAverageTimePerDay,
  handleGetTopUsersByPartId,
  handleGetTopUsersByGrammarId,
  handleGetCorrectAnswerPercentageByGrammars,
  handleGetCorrectAnswerPercentageByParts,
  handleGetVocabularyLearningPercentage,
};

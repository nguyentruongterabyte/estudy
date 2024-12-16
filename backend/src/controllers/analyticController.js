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

export default {
  handleGetAverageTimePerDay,
  handleGetTopUsersByPartId,
};

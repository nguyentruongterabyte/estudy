import levelService from '../services/levelService';

const handleGetAll = async (req, res) => {
  try {
    const levels = await levelService.getAll();
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: levels,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleGetAll,
};

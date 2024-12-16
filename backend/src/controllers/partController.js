import partService from '../services/partService';

const handleGetAll = async (_, res) => {
  try {
    const parts = await partService.getAll();
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: parts,
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

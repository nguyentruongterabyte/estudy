import questionGroupService from '../services/questionGroupService';

const handleUpdate = async (req, res) => {
  const { questionGroup } = req.body;

  if (!questionGroup) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    await questionGroupService.update(questionGroup);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

module.exports = {
  handleUpdate,
};

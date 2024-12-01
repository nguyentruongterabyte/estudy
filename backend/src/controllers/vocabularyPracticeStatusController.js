import vocabularyPracticeStatusesService from '../services/vocabularyPracticeStatusesService';

const handleGetVocabularyStatusesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const vocabularyStatuses = await vocabularyPracticeStatusesService.getVocabularyStatusesByUserId(userId);

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: vocabularyStatuses,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleCreateOrUpdate = async (req, res) => {
  const { userId, vocabularyId } = req.params;

  const { status } = req.body;

  try {
    const record = await vocabularyPracticeStatusesService.createOrUpdate(userId, vocabularyId, status);

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: record,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleGetVocabularyStatusesByUserId,
  handleCreateOrUpdate,
};

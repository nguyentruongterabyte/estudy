import vocabularyService from '../services/vocabularyService';

const handleCreateVocabularyTopic = async (req, res) => {
  const data = req.body;

  vocabularyService
    .createVocabularyTopic(data)
    .then((newTopic) => {
      res.status(201).json({
        errCode: 0,
        errMessage: 'Vocabulary Topic created successfully',
        data: newTopic,
      });
    })
    .catch((error) => {
      res.status(500).json({
        errCode: 1,
        errMessage: error.message,
      });
    });
};

module.exports = {
  handleCreateVocabularyTopic,
};

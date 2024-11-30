import vocabularyService from '../services/vocabularyService';
import vocabularyTopicService from '../services/vocabularyTopicService';

const handleGetByTopicId = async (req, res) => {
  try {
    const { topicId } = req.params;

    // const topic = await vocabularyTopicService.get(topicId);
    // if (!topic)
    //   return res.status(404).json({
    //     errCode: 1,
    //     errMessage: 'Vocabulary topic not found',
    //   });

    const vocabularies = await vocabularyService.getByTopicId(topicId);

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: vocabularies,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleGetByTopicId,
};

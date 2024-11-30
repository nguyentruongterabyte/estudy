import photoService from '../services/photoService';
import vocabularyService from '../services/vocabularyService';
import vocabularyTopicService from '../services/vocabularyTopicService';

const handleSaveVocabularyTopic = async (req, res) => {
  const { name, vocabularies } = req.body;

  try {
    const newTopic = await vocabularyTopicService.save({ name });

    const newVocabularies = await Promise.all(
      vocabularies.map(async (vocab) => {
        const { id, ...vocabWithoutId } = vocab;
        const newVocab = await vocabularyService.save({ ...vocabWithoutId, topicId: newTopic.id });

        return newVocab;
      }),
    );

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        newTopic,
        newVocabularies,
      },
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdate = async (req, res) => {
  const { id, name, vocabularies } = req.body;
  const topicId = id;

  try {
    const topic = await vocabularyTopicService.get(id);

    if (!topic)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Vocabulary topic not found',
      });

    const vocabsDB = await vocabularyService.getByTopicId(id);

    await vocabularyTopicService.update({ id, name });

    // handle delete old vocabularies data
    await Promise.all(
      vocabsDB.map(async (vocab) => {
        // handle delete photo
        if (typeof vocab.photo !== 'string') {
          const photo = await photoService.get(vocab.photoId);

          await photoService.deleteFirebasePhotoByUrl(photo.filePath);
          await photoService.destroy(photo.id);
        }

        await vocabularyService.destroy(vocab.id);
      }),
    );

    // handle save new vocabularies data
    const newVocabularies = await Promise.all(
      vocabularies.map(async (vocab) => {
        const { id, ...vocabWithoutId } = vocab;
        const newVocab = await vocabularyService.save({ ...vocabWithoutId, topicId });

        return newVocab;
      }),
    );

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        id: id,
        name: name,
        vocabularies: newVocabularies,
      },
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetAll = async (req, res) => {
  try {
    const topics = await vocabularyTopicService.getAll();
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { topicId } = req.params;

  try {
    const topic = await vocabularyTopicService.get(topicId);

    if (!topic) {
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Vocabulary topic not found',
      });
    }

    const vocabsDB = await vocabularyService.getByTopicId(topicId);

    await Promise.all(
      vocabsDB.map(async (vocab) => {
        if (vocab.photoId) {
          const photo = await photoService.get(vocab.photoId);

          await photoService.deleteFirebasePhotoByUrl(photo.filePath);

          await photoService.destroy(photo.id);
        }

        await vocabularyService.destroy(vocab.id);
      }),
    );

    await vocabularyTopicService.destroy(topicId);

    res.status(200).json({
      errCode: 0,
      errMessage: 'Topic deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleSaveVocabularyTopic,
  handleUpdate,
  handleGetAll,
  handleDelete,
};

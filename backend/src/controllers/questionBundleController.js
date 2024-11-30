import questionBundleService from '../services/questionBundleService';
import audioService from '../services/audioService';
import photoService from '../services/photoService';

const handleGetQuestionBundlesByGroupId = async (req, res) => {
  const groupId = req.params.groupId;
  const audio = req.query.audio;
  const photo = req.query.photo;

  try {
    let questionBundles = await questionBundleService.getByGroupId(groupId);

    for (let questionBundle of questionBundles) {
      if (audio && questionBundle.audioId) {
        const a = await audioService.get(questionBundle.audioId);
        questionBundle.audio = a.audioLink;
      }

      if (photo && questionBundle.photoId) {
        const p = await photoService.get(questionBundle.photoId);
        questionBundle.photo = p.filePath;
      }
    }

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: questionBundles,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleCreateBundlePhoto = async (req, res) => {
  const { photoId, bundleId } = req.body;

  if (!bundleId || !photoId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  try {
    await questionBundleService.update({ id: bundleId, photoId });
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

const handleCreateBundleAudio = async (req, res) => {
  const { bundleId, audioId } = req.body;
  if (!bundleId || !audioId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    await questionBundleService.update({ id: bundleId, audioId });
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

const handleUpdateMany = async (req, res) => {
  try {
    const { questionBundles } = req.body;
    await questionBundleService.updateMany(questionBundles);
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
  handleCreateBundleAudio,
  handleCreateBundlePhoto,
  handleGetQuestionBundlesByGroupId,
  handleUpdateMany,
};

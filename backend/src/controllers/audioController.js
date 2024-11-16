import audioService from '../services/audioService';

const handleSaveAudio = async (req, res) => {
  const { audioLink } = req.body;
  if (!audioLink)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    const newAudio = await audioService.save(audioLink);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newAudio,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUploadAudio = async (req, res) => {
  try {
    const file = req.file;

    const url = await audioService.uploadFirebase(file);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: url,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleUploadAudio,
  handleSaveAudio,
};

import audioService from '../services/audioService';

const handleSave = async (req, res) => {
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

const handleUpload = async (req, res) => {
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

const handleDeleteFirebaseAudioByUrl = async (req, res) => {
  const { url } = req.body;
  if (!url)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    await audioService.deleteFirebaseAudioByUrl(url);

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
  handleUpload,
  handleSave,
  handleDeleteFirebaseAudioByUrl
};

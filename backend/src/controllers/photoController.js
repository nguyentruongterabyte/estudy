import photoService from '../services/photoService';
const handleUpload = async (req, res) => {
  try {
    const file = req.file;
    const url = await photoService.uploadFirebase(file);

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

const handleSave = async (req, res) => {
  const { filePath } = req.body;
  if (!filePath)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    const newPhoto = await photoService.save({ filePath });
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newPhoto,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleteFirebasePhotoByUrl = async (req, res) => {
  const { url } = req.body;
  if (!url)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    await photoService.deleteFirebasePhotoByUrl(url);

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

module.exports = {
  handleUpload,
  handleDeleteFirebasePhotoByUrl,
  handleSave,
};

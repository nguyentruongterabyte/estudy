import { bucket } from '../config/firebaseConfig';
import { unlinkSync } from 'fs';
import audioService from '../services/audioService'

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
  handleUploadAudio
}
const { bucket } = require('../config/firebaseConfig');
const fs = require('fs');

const handleUploadAudio = async (req, res) => {
  try {
    const file = req.file;

    const firebaseFilename = `audios/${Date.now()}-${file.originalname}`;

    await bucket.upload(file.path, {
      destination: firebaseFilename,
      metadata: {
        contentType: 'audio/mpeg',
      },
    });

    const fileRef = bucket.file(firebaseFilename);
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    fs.unlinkSync(file.path);

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
  handleUploadAudio
}
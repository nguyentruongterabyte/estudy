import correctAnswerService from '../services/correctAnswerService';
import questionService from '../services/questionService';

const handleUpdatePhotos = async (req, res) => {
  try {
    const { photos } = req.body;
    await questionService.updatePhotos( photos );
    res.json({
      errCode: 0,
      errMessage: 'OK',
      // data: updatedPhotos
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdateAudios = async (req, res) => {
  try {
    const { audios } = req.body;
    await questionService.updateAudios(audios);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      // data: updatedAudios
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdateCorrectAnswers = async (req, res) => {
  const { correctAnswers } = req.body;

  if (!correctAnswers)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });

  try {
    await correctAnswerService.update(correctAnswers);
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
  handleUpdateCorrectAnswers,
  handleUpdatePhotos,
  handleUpdateAudios
};

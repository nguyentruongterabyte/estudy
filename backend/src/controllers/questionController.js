import correctAnswerService from '../services/correctAnswerService';
import questionService from '../services/questionService';
import audioService from '../services/audioService';
import photoService from '../services/photoService';

const handleUpdatePhotos = async (req, res) => {
  try {
    const { photos } = req.body;
    await questionService.updatePhotos(photos);
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

const handleUpdateMany = async (req, res) => {
  try {
    const { questions } = req.body;
    await questionService.updateMany(questions);
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

const handleGetQuestionsByGroupId = async (req, res) => {
  const groupId = req.params.groupId;
  const audio = req.query.audio;
  const photo = req.query.photo;
  try {
    let questions = await questionService.getByGroupId(groupId);

    for (let question of questions) {
      if (audio && question.audioId) {
        const questionAudio = await audioService.get(question.audioId);
        question.audio = questionAudio.audioLink;
      }

      if (photo && question.photoId) {
        const questionPhoto = await photoService.get(question.photoId);
        question.photo = questionPhoto.filePath;
      }
    }

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleCreateQuestionAudio = async (req, res) => {
  const { questionId, audioId } = req.body;
  if (!questionId || !audioId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    await questionService.update({ id: questionId, audioId });
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

const handleCreateQuestionPhoto = async (req, res) => {
  const { photoId, questionId } = req.body;

  if (!questionId || !photoId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  try {
    await questionService.update({ id: questionId, photoId });
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



export default {
  handleCreateQuestionPhoto,
  handleCreateQuestionAudio,
  handleGetQuestionsByGroupId,
  handleUpdateCorrectAnswers,
  handleUpdatePhotos,
  handleUpdateAudios,
  handleUpdateMany,
};

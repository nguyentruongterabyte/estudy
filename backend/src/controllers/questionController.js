import correctAnswerService from '../services/correctAnswerService';
import questionService from '../services/questionService';
import audioService from '../services/audioService';
import photoService from '../services/photoService';
import questionAudioService from '../services/questionAudioService';

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

const handleGetQuestionsByGroupId = async (req, res) => {
  const groupId = req.params.groupId;
  const audio = req.query.audio;
  const photo = req.query.photo;
  try {
    let questions = await questionService.getByGroupId(groupId);

    for (let question of questions) {
      if (audio) {
        const questionAudio = await audioService.getByQuestionId(question.id);
        question.audio = questionAudio.audioLink;
      }

      if (photo) {
        const questionPhoto = await photoService.getByQuestionId(question.id);
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

const handleCreateQuestionPhoto = async (req, res) => {
  const { filePath, questionId } = req.body;

  if (!filePath || !questionId) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    const newPhoto = await photoService.save({ questionId, filePath });
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newPhoto,
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
    const newQuestionAudio = await questionAudioService.save({ questionId, audioId });
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newQuestionAudio,
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
  handleGetQuestionsByGroupId,
  handleUpdateCorrectAnswers,
  handleUpdatePhotos,
  handleUpdateAudios,
  handleCreateQuestionAudio,
  handleUpdateMany,
};

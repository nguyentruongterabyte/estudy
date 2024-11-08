import questionService from '../services/questionService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';

const handleGetQuestionGroupsByPartId = async (req, res) => {
  const partId = req.params.partId;
  
  try {
    const groupQuestions = await questionService.getQuestionGroupsByPart(partId);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: groupQuestions,
    });
  } catch (error) {
    return res.status(500).json({
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
    let questions = await questionService.getByGroupId( groupId );
    
    for ( let question of questions ) {
      if ( audio ) {
        const questionAudio = await audioService.getByQuestionId( question.id );
        question.audio = questionAudio.audioLink;
      }

      if ( photo ) {
        const questionPhoto = await photoService.getByQuestionId( question.id );
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

module.exports = {
  handleGetQuestionGroupsByPartId,
  handleGetQuestionsByGroupId,
};

import questionService from '../services/questionService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';
import questionAudioService from '../services/questionAudioService'

const handleSaveTest = async (req, res) => {
  const { name, partId, questions } = req.body;

  try {
    const newQuestionGroup = await questionGroupService.save({ name, partId });
    // Create questions
    const newQuestions = await Promise.all(
      questions.map(async (question) => {
        const answers = question.answers;
        const correctAnswerIndex = question.correctAnswerIndex;
        let newQuestion;
        if (partId === 1) {
          const correctAnswer = answers.find((item) => item.id === correctAnswerIndex);
          newQuestion = await questionService.save({ question: correctAnswer.answer, groupId: newQuestionGroup.id });
        } else {
          newQuestion = await questionService.save({ question: question.question, groupId: newQuestionGroup.id });
        }

        return newQuestion;
      }),
    );

    // create answers
    const questionsWithAnswers = await Promise.all(
      newQuestions.map(async (question, index) => {
        const answers = questions[index].answers;
        
        const newAnswers = [];

        for ( const answer of answers ) {
          const newAnswer = await answerService.save( { questionId: question.id, answer: answer.answer } );
          newAnswers.push( newAnswer );
        }

        return { ...question.dataValues, answers: newAnswers };
      }),
    );

    // Create correct answer
    const questionsWithCorrectAnswers = await Promise.all(
      questionsWithAnswers.map(async (question, index) => {
        const correctAnswerIndex = questions[index].correctAnswerIndex;
        const answers = question.answers;
        const correctAnswer = answers[correctAnswerIndex];
        const newCorrectAnswer = await correctAnswerService.save({
          questionId: question.id,
          answerId: correctAnswer.id,
        });
        return { ...question, correctAnswer: newCorrectAnswer };
      }),
    );

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        questionGroup: newQuestionGroup,
        questions: questionsWithCorrectAnswers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleCreateQuestionAudio = async ( req, res ) => {
  const { questionId, audioId } = req.body;
  if ( !questionId || !audioId ) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });   
  }

  try {
    const newQuestionAudio = await questionAudioService.save( { questionId, audioId } );
    return res.json( {
      errCode: 0,
      errMessage: 'OK',
      data: newQuestionAudio
    } );
  } catch ( error ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
}

const handleCreateQuestionPhoto = async (req, res) => {
  const { filePath, questionId } = req.body;

  if ( !filePath || !questionId ) {
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

const handleGetQuestionGroupsByPartId = async (req, res) => {
  const partId = req.params.partId;

  try {
    const groupQuestions = await questionGroupService.getByPartId(partId);
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

module.exports = {
  handleGetQuestionGroupsByPartId,
  handleGetQuestionsByGroupId,
  handleSaveTest,
  handleCreateQuestionPhoto,
  handleCreateQuestionAudio
};

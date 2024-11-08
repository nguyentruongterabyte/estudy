import db from '../models/index';

const getByQuestionId = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const answers = await db.Answer.findAll({
        attributes: ['id', 'answer'],
        where: { questionId },
        raw: true,
      });
      resolve(answers);
    } catch (e) {
      reject(e);
    }
  });
};

const getCorrectAnswer = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const correctAnswer = await db.CorrectAnswer.findOne({
        where: { questionId },
        attributes: ['answerId'],
        raw: true,
      });
      resolve(correctAnswer);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getByQuestionId,
  getCorrectAnswer
};

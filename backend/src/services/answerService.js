import db from '../models/index';

const updateAnswers = (answers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = answers.map(async (answer) => {
        const { id, ...data } = answer;
        return await db.Answer.update(data, { where: { id } });
      });

      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const answer = await db.Answer.findOne({ where: { id }, raw: true });
      resolve(answer);
    } catch (e) {
      reject(e);
    }
  });
};

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newAnswer = await db.Answer.create(data);
      resolve(newAnswer);
    } catch (e) {
      reject(e);
    }
  });
};

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

export default {
  getByQuestionId,
  getCorrectAnswer,
  save,
  get,
  updateAnswers,
};

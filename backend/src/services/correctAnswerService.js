import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newCorrectAnswer = await db.CorrectAnswer.create(data);
      resolve(newCorrectAnswer);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (correctAnswers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = correctAnswers.map(async (correctAnswer) => {
        const { questionId, answerId } = correctAnswer;
        return await db.CorrectAnswer.update({ answerId }, { where: { questionId } });
      });
      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

// update correct answers by question id
const updateManyByQuestionId = (correctAnswers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = correctAnswers.map(async (ca) => {
        const { questionId, ...data } = ca;
        return await db.CorrectAnswer.update(data, { where: { questionId } });
      });
      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default { save, update, updateManyByQuestionId };

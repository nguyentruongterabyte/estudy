import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUserAnswer = await db.UserAnswer.create(data);

      resolve(newUserAnswer);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  save,
};

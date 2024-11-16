import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuestionAudio = await db.QuestionAudio.create(data);
      resolve(newQuestionAudio);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { save };

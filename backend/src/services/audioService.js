import db from '../models/index';

const getByQuestionId = (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionAudio = await db.QuestionAudio.findOne({
        attributes: ['audioId'],
        where: { questionId },
        raw: true,
      });
      if (questionAudio) {
        const audio = await db.Audio.findOne({
          attributes: ['audioLink'],
          where: { id: questionAudio.audioId },
          raw: true,
        });

        resolve(audio);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { getByQuestionId };

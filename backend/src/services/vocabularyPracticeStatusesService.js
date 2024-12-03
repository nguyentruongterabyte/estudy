import db from '../models/index';

const getVocabularyStatusesByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vocabularyStatuses = await db.sequelize.query('CALL GetVocabularyStatuses(:userId)', {
        replacements: { userId: userId },
        type: db.sequelize.QueryTypes.RAW,
      });
      resolve(vocabularyStatuses); // return array of status 'vocabularyId', 'topicId', 'status'
    } catch (e) {
      reject(e);
    }
  });
};

const createOrUpdate = (userId, vocabularyId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [record, created] = await db.VocabularyPracticeStatus.findOrCreate({
        where: { userId, vocabularyId },
        defaults: { status },
      });

      if (!created) {
        await db.VocabularyPracticeStatus.update({ status }, { where: { userId, vocabularyId } });
      }
      resolve(record);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getVocabularyStatusesByUserId,
  createOrUpdate,
};

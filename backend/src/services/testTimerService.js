import db from '../models/index';

const getByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const testTimers = await db.TestTimer.findAll({
        where: { userId },
        raw: true,
      });
      resolve(testTimers);
    } catch (e) {
      reject(e);
    }
  });
};

const get = (userId, groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const testTimer = await db.TestTimer.findOne({
        where: { userId, groupId },
        attributes: ['secondsElapsed'],
        raw: true,
      });
      resolve(testTimer);
    } catch (e) {
      reject(e);
    }
  });
};

const createOrUpdate = (userId, groupId, secondsElapsed) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [record, created] = await db.TestTimer.findOrCreate({
        where: { userId, groupId },
        defaults: { secondsElapsed },
      });

      if (!created) {
        await db.TestTimer.update({ secondsElapsed }, { where: { userId, groupId } });
      }
      resolve(record);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getByUserId,
  get,
  createOrUpdate,
};

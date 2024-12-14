import db from '../models/index';

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const levels = await db.Level.findAll({
        attributes: ['id', 'code', 'name'],
      });
      resolve(levels);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAll,
};

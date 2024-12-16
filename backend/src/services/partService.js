import db from '../models/index';

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const parts = await db.Part.findAll({
        attributes: ['id', 'name'],
      });
      resolve(parts);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAll,
};

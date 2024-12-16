import db from '../models/index';

const getAverageTimePerDay = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const averageTimes = await db.sequelize.query('CALL GetAverageTimePerDay()', {
        type: db.sequelize.QueryTypes.RAW,
      });
      // console.log(averageTimes);
      resolve(averageTimes);
    } catch (e) {
      reject(e);
    }
  });
};

const getTopUsersByPartId = (partId, topUsers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.sequelize.query('CALL estudy.GetTopUsersByPart(:partId, :topUsers)', {
        replacements: { partId, topUsers },
        type: db.sequelize.QueryTypes.RAW,
      });
      // console.log(users);
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAverageTimePerDay,
  getTopUsersByPartId,
};

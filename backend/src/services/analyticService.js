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

const getTopUsersByGrammarId = (grammarId, topUsers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.sequelize.query('CALL estudy.GetTopUsersByGrammar(:grammarId, :topUsers)', {
        replacements: { grammarId, topUsers },
        type: db.sequelize.QueryTypes.RAW,
      });
      // console.log(users);
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const getCorrectAnswerPercentageByParts = (partIds = [], userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const percentages = await db.sequelize.query('CALL estudy.GetCorrectAnswerPercentageByParts(:partIds, :userId)', {
        replacements: { partIds: partIds.join(','), userId },
        type: db.sequelize.QueryTypes.RAW,
      });
      // console.log(percentages[0]);
      resolve(percentages[0]);
    } catch (e) {
      reject(e);
    }
  });
};

const getCorrectAnswerPercentageByGrammars = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const percentages = await db.sequelize.query('CALL estudy.GetCorrectAnswerPercentageByGrammars(:userId)', {
        replacements: { userId },
        type: db.sequelize.QueryTypes.RAW,
      });
      resolve(percentages[0]);
    } catch (e) {
      reject(e);
    }
  });
};

const getVocabularyLearningPercentage = (userId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const percentages = await db.sequelize.query('CALL estudy.GetVocabularyLearningPercentage(:userId, :status)', {
        replacements: { userId, status },
        type: db.sequelize.QueryTypes.RAW,
      });
      // console.log(percentages[0]);
      resolve(percentages[0]);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAverageTimePerDay,
  getTopUsersByPartId,
  getTopUsersByGrammarId,
  getCorrectAnswerPercentageByParts,
  getCorrectAnswerPercentageByGrammars,
  getVocabularyLearningPercentage,
};

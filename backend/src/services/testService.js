import db from '../models/index';

const getUserAnswers = async (userId, groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userAnswers = await db.sequelize.query('CALL estudy.GetUserAnswers(:p_userId, :p_groupId)', {
        replacements: { p_userId: userId, p_groupId: groupId },
      });

      resolve(userAnswers);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getUserAnswers
}
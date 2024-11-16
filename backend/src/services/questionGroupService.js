import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuestionGroup = await db.QuestionGroup.create(data);
      resolve(newQuestionGroup);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (questionGroup) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = questionGroup;
      await db.QuestionGroup.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getByPartId = (partId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionGroups = await db.QuestionGroup.findAll({
        attributes: ['id', 'name'],
        where: { partId },
        raw: true,
      });
      resolve(questionGroups);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getByPartId,
  save,
  update
};

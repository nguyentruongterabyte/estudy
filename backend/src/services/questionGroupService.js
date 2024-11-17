import db from '../models/index';

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.QuestionGroup.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

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

const get = (groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionGroup = await db.QuestionGroup.findOne({
        where: { id: groupId },
        attributes: ['partId'],
      });
      resolve(questionGroup);
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
  update,
  get,
  destroy
};

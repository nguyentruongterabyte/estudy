import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newTopic = await db.VocabularyTopic.create(data);
      resolve(newTopic);
    } catch (e) {
      reject(e);
    }
  });
};

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.VocabularyTopic.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (vocabularyTopic) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = vocabularyTopic;
      await db.VocabularyTopic.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await db.VocabularyTopic.findOne({
        where: { id },
      });
      resolve(topic);
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const topics = await db.VocabularyTopic.findAll();
      resolve(topics);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  save,
  destroy,
  update,
  get,
  getAll,
};

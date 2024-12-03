import db from '../models/index';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newGrammar = await db.Grammar.create(data);
      resolve(newGrammar);
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const grammar = await db.Grammar.findOne({
        where: { id },
      });
      resolve(grammar);
    } catch (e) {
      reject(e);
    }
  });
};

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.Grammar.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (grammar) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = grammar;
      await db.Grammar.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const grammars = await db.Grammar.findAll({
        attributes: ['id', 'name'],
      });
      resolve(grammars);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  save,
  get,
  destroy,
  update,
  getAll,
};

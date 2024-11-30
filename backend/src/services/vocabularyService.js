import db from '../models/index';
import photoService from './photoService';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newVocab = await db.Vocabulary.create(data);
      resolve(newVocab);
    } catch (e) {
      reject(e);
    }
  });
};

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.Vocabulary.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (vocabulary) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = vocabulary;
      await db.Vocabulary.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getByTopicId = (topicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vocabularies = await db.Vocabulary.findAll({
        where: { topicId },
        attributes: ['id', 'word', 'pronunciation', 'definition', 'example', 'photoId', 'topicId'],
        raw: true,
      });

      const vocabulariesWithPhotos = await Promise.all(
        vocabularies.map(async (vocab) => {
          const vocabWithPhoto = { ...vocab };
          vocabWithPhoto.photo = '';
          if (vocab.photoId) {
            const photo = await photoService.get(vocab.photoId);
            vocabWithPhoto.photo = photo.filePath;
          }
          return vocabWithPhoto;
        }),
      );

      resolve(vocabulariesWithPhotos);
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const vocab = await db.Vocabulary.findOne({
        where: { id },
        raw: true,
      });
      resolve(vocab);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  save,
  destroy,
  update,
  getByTopicId,
  get
};

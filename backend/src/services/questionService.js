import db from '../models/index';
import answerService from './answerService';
import audioService from './audioService';
import photoService from './photoService';

const updateMany = (questions) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = questions.map(async (question) => {
        const { id, ...data } = question;
        await db.Question.update(data, { where: { id } });
      });

      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const destroy = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowEffected = await db.Question.destroy({
        where: { id },
      });
      resolve(rowEffected);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (question) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = question;
      await db.Question.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updatePhotos = (photos) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = photos.map(async (photo) => {
        const photoDB = await photoService.get(photo.id);
        await photoService.deleteFirebasePhotoByUrl(photoDB.filePath);
        photoDB.filePath = photo.url;
        await photoService.update(photoDB);
      });

      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updateAudios = (audios) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = audios.map(async (audio) => {
        const audioDB = await audioService.get(audio.id);
        await audioService.deleteFirebaseAudioByUrl(audioDB.audioLink);
        audioDB.audioLink = audio.url;
        await audioService.update(audioDB);
      });

      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuestion = await db.Question.create(data);
      resolve(newQuestion);
    } catch (e) {
      reject(e);
    }
  });
};

const get = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const question = await db.Question.findOne({
        where: { id },
      });
      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

const getByGroupId = (groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await db.Question.findAll({
        attributes: ['id', 'photoId', 'audioId', 'question'],
        where: { groupId },
        raw: true,
      });

      const questionWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answers = await answerService.getByQuestionId(question.id);
          const correctAnswer = await answerService.getCorrectAnswer(question.id);
          return { ...question, answers, correctAnswer };
        }),
      );

      resolve(questionWithAnswers);
    } catch (e) {
      reject(e);
    }
  });
};

const getByQuestionBundleId = (bundleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await db.Question.findAll({
        attributes: ['id', 'question', 'bundleId'],
        where: { bundleId },
        raw: true,
      });

      const questionWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answers = await answerService.getByQuestionId(question.id);
          const correctAnswer = await answerService.getCorrectAnswer(question.id);
          return { ...question, answers, correctAnswer };
        }),
      );

      resolve(questionWithAnswers);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getByGroupId,
  save,
  update,
  updatePhotos,
  updateAudios,
  updateMany,
  get,
  getByQuestionBundleId,
  destroy,
};

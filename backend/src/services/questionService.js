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

const updatePhotos = (photos) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = photos.map(async (photo) => {
        const photoDB = await photoService.getByQuestionId(photo.questionId);
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
        const audioDB = await audioService.getByQuestionId(audio.questionId);
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

const getByGroupId = (groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await db.Question.findAll({
        attributes: ['id', 'question'],
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

module.exports = {
  getByGroupId,
  save,
  updatePhotos,
  updateAudios,
  updateMany
};

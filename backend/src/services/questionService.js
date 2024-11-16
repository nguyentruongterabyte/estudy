import db from '../models/index';
import answerService from './answerService';
import photoService from './photoService';

const updatePhotos = (photos) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = photos.map(async (photo) => {
        const photoDB = await photoService.getByQuestionId(photo.questionId);
        await photoService.deleteFirebasePhotoByUrl(photoDB.filePath);
        photoDB.filePath = photo.url;
        console.log(photoDB);
        await photoService.update(photoDB);
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
};

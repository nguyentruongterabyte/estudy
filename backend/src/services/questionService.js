import db from '../models/index';
import answerService from './answerService';

const getQuestionGroupsByPart = (partId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const groupQuestions = await db.GroupQuestion.findAll({
        attributes: ['id', 'name'],
        where: { partId },
        raw: true,
      });
      resolve(groupQuestions);
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
  getQuestionGroupsByPart,
  getByGroupId
};

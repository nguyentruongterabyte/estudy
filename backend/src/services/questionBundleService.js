import db from '../models/index';
import questionService from './questionService';

const save = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuesionBundle = await db.QuestionBundle.create(data);
      resolve(newQuesionBundle);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (questionBundle) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...data } = questionBundle;
      await db.QuestionBundle.update(data, { where: { id } });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const getByGroupId = (questionGroupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionBundles = await db.QuestionBundle.findAll({
        attributes: ['id', 'photoId', 'audioId', 'text'],
        where: { questionGroupId },
      });

      const bundlesWithQuestions = await Promise.all(
        questionBundles.map(async (questionBundle) => {
          const questions = await questionService.getByQuestionBundleId(questionBundle.id);
          return { ...questionBundle, questions };
        }),
      );
      resolve(bundlesWithQuestions);
    } catch (e) {
      reject(e);
    }
  });
};

const updateMany = (questionBundles) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = questionBundles.map(async (questionBundle) => {
        const { id, ...data } = questionBundle;
        await db.QuestionBundle.update(data, { where: { id } });
      });

      await Promise.all(updatePromises);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  save,
  update,
  getByGroupId,
  updateMany,
};

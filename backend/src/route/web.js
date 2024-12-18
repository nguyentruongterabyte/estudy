import express from 'express';

// import middleware
import upload from '../middleware/uploadMiddleware';
import verifyJWT from '../middleware/verifyJWT';
import { ROLES_OBJECT } from '../config/rolesList';
import verifyRoles from '../middleware/verifyRoles';
import verifyUserOwnership from '../middleware/verifyUserOwnership';
import urls from '../config/urls';
// import controller
import userController from '../controllers/userController';
import vocabularyController from '../controllers/vocabularyController';
import testController from '../controllers/testController';
import audioController from '../controllers/audioController';
import photoController from '../controllers/photoController';
import answerController from '../controllers/answerController';
import questionController from '../controllers/questionController';
import questionGroupController from '../controllers/questionGroupController';
import questionBundleController from '../controllers/questionBundleController';
import userAnswerController from '../controllers/userAnswerController';
import vocabularyTopicController from '../controllers/vocabularyTopicController';
import correctAnswerController from '../controllers/correctAnswerController';
import vocabularyPracticeStatusController from '../controllers/vocabularyPracticeStatusController';
import grammarController from '../controllers/grammarController';
import testTimerController from '../controllers/testTimerController';
import levelController from '../controllers/levelController';
import analyticController from '../controllers/analyticController';
import partController from '../controllers/partController';
let router = express.Router();

let initWebRoutes = (app) => {
  // user
  router.get(urls.user.get, verifyJWT, verifyUserOwnership, userController.handleGetById);
  router.get(urls.user.getAll, verifyJWT, verifyRoles(ROLES_OBJECT.ADMIN), userController.handleGetAllUser);
  router.post(urls.user.register, userController.handleNewUser);
  router.post(urls.user.createEditor, verifyJWT, verifyRoles(ROLES_OBJECT.ADMIN), userController.handleNewEditor);
  router.post(urls.user.login, userController.handleUserLogin);
  router.get(urls.user.refreshToken, userController.handleRefreshToken);
  router.get(urls.user.logout, userController.handleLogout);
  router.put(urls.user.update, verifyJWT, verifyUserOwnership, userController.handleUpdate);
  router.put(urls.user.updateAvatar, verifyJWT, verifyUserOwnership, userController.handleUpdateAvatar);
  router.put(urls.user.updatePassword, verifyJWT, verifyUserOwnership, userController.handleUpdatePassword);
  router.delete(urls.user.deleteUser, verifyJWT, verifyRoles(ROLES_OBJECT.ADMIN), userController.handleDeleteUser);
  router.post(urls.user.sendOTPEmail, userController.handleVerifyCaptchaAndSendOTPEmail);
  router.post(urls.user.verifyOTP, userController.handleVerifyOTP);
  router.post(urls.user.resetPassword, userController.handleResetPassword);
  // vocabulary
  router.get(
    urls.vocabulary.getByTopicId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    vocabularyController.handleGetByTopicId,
  );

  // vocabulary topic
  router.post(
    urls.vocabularyTopic.create,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyTopicController.handleSaveVocabularyTopic,
  );

  router.get(
    urls.vocabularyTopic.getAll,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    vocabularyTopicController.handleGetAll,
  );

  router.delete(
    urls.vocabularyTopic.delete,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyTopicController.handleDelete,
  );

  router.put(
    urls.vocabularyTopic.update,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyTopicController.handleUpdate,
  );

  router.get(
    urls.vocabularyTopic.getByLevelId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    vocabularyTopicController.handleGetByLevelId,
  );

  // vocabulary statuses
  router.get(
    urls.vocabularyStatuses.getByUserId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.USER),
    verifyUserOwnership,
    vocabularyPracticeStatusController.handleGetVocabularyStatusesByUserId,
  );

  router.put(
    urls.vocabularyStatuses.update,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    vocabularyPracticeStatusController.handleCreateOrUpdate,
  );

  // Audio
  router.post(urls.audio.create, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), audioController.handleSave);

  router.post(
    urls.audio.upload,
    upload.single('audio'),
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    audioController.handleUpload,
  );

  // Photo
  router.post(urls.photo.create, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), photoController.handleSave);

  router.post(
    urls.photo.upload,
    upload.single('photo'),
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    photoController.handleUpload,
  );

  router.delete(urls.photo.delete, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), photoController.handleDestroy);

  // level
  router.get(urls.level.getAll, levelController.handleGetAll);

  // part
  router.get(urls.part.getAll, partController.handleGetAll);

  // test
  router.post(urls.test.create, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleSaveTest);
  router.post(urls.test.createBundle, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleSaveBundleTest);
  router.delete(urls.test.delete, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleDeleteTest);
  router.delete(
    urls.test.deleteBundle,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    testController.handleDeleleBundleTest,
  );

  // Test timers
  router.get(
    urls.testTimer.getByUserId,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    testTimerController.handleGetByUserId,
  );

  router.get(
    urls.testTimer.get,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    testTimerController.handleGetOne,
  );

  router.get(
    urls.testTimer.create,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    testTimerController.handleUpdate,
  );

  // Grammars
  router.get(
    urls.grammar.getByLevelId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    grammarController.handleGetByLevelId,
  );
  router.get(
    urls.grammar.getAll,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    grammarController.handleGetAll,
  );

  router.put(urls.grammar.update, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), grammarController.handleUpdate);

  router.delete(
    urls.grammar.delete,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    grammarController.handleDelete,
  );

  router.post(
    urls.grammar.create,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    grammarController.handleSave,
  );

  // Answers
  router.put(urls.answer.update, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), answerController.handleUpdateAnswers);

  // Correct Answers
  router.put(
    urls.correctAnswer.updateMany,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    correctAnswerController.handleUpdateManyByQuestionId,
  );

  // User answer
  router.get(
    urls.test.getUserAnswers,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    testController.handleGetUserAnswers,
  );
  router.get(
    urls.userAnswer.create,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    userAnswerController.handleCreateUserAnswer,
  );
  router.delete(
    urls.userAnswer.delete,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    userAnswerController.handleDeleteUserAnswers,
  );

  // Bundle Question
  router.put(
    urls.questionBundle.updateMany,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionBundleController.handleUpdateMany,
  );

  router.get(
    urls.questionBundle.getByGroupId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    questionBundleController.handleGetQuestionBundlesByGroupId,
  );

  router.post(
    urls.questionBundle.createBundlePhoto,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionBundleController.handleCreateBundlePhoto,
  );

  router.post(
    urls.questionBundle.createBundleAudio,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionBundleController.handleCreateBundleAudio,
  );

  // Questions
  router.put(
    urls.question.updateMany,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleUpdateMany,
  );
  router.put(
    urls.question.updateCorrectAnswers,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleUpdateCorrectAnswers,
  );
  router.put(
    urls.question.updatePhotos,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleUpdatePhotos,
  );
  router.put(
    urls.question.updateAudios,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleUpdateAudios,
  );
  router.get(
    urls.question.getByGroupId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    questionController.handleGetQuestionsByGroupId,
  );

  router.post(
    urls.question.createQuestionPhoto,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleCreateQuestionPhoto,
  );

  router.post(
    urls.question.createQuestionAudio,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleCreateQuestionAudio,
  );

  router.delete(
    urls.question.delete,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleDeleteQuestion,
  );

  router.post(urls.question.save, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), questionController.handleSaveQuestion);

  router.post(
    urls.question.saveMany,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionController.handleSaveQuestions,
  );

  // Question Group
  router.put(
    urls.questionGroup.update,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionGroupController.handleUpdate,
  );

  router.get(
    urls.questionGroup.getByPartId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    questionGroupController.handleGetQuestionGroupsByPartId,
  );

  router.get(
    urls.questionGroup.getByGrammarId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    questionGroupController.handleGetQuestionGroupsByGrammarId,
  );

  // analytic
  router.get(
    urls.analytic.getAverageTimePerDay,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.ADMIN),
    analyticController.handleGetAverageTimePerDay,
  );

  router.get(
    urls.analytic.getTopUsersByPartId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.ADMIN, ROLES_OBJECT.USER),
    analyticController.handleGetTopUsersByPartId,
  );

  router.get(
    urls.analytic.getTopUsersByGrammarId,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.ADMIN, ROLES_OBJECT.USER),
    analyticController.handleGetTopUsersByGrammarId,
  );

  router.get(
    urls.analytic.getVocabularyLearningPercentage,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    analyticController.handleGetVocabularyLearningPercentage,
  );

  router.get(
    urls.analytic.getCorrectAnswerPercentageByGrammars,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    analyticController.handleGetCorrectAnswerPercentageByGrammars,
  );

  router.post(
    urls.analytic.getCorrectAnswerPercentageByParts,
    verifyJWT,
    verifyUserOwnership,
    verifyRoles(ROLES_OBJECT.USER),
    analyticController.handleGetCorrectAnswerPercentageByParts,
  );

  return app.use('/', router);
};

module.exports = initWebRoutes;

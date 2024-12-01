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
let router = express.Router();

let initWebRoutes = (app) => {
  // user
  router.get('/api/user', verifyJWT, verifyUserOwnership, userController.handleGetById);
  router.get(
    '/api/user/get-all',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.ADMIN, ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    userController.handleGetAllUser,
  );
  router.post(urls.user.register, userController.handleNewUser);
  router.post(urls.user.login, userController.handleUserLogin);
  router.get(urls.user.refreshToken, userController.handleRefreshToken);
  router.get(urls.user.logout, userController.handleLogout);

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
    verifyRoles( ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER ),
    vocabularyTopicController.handleGetAll,
  );

  router.delete(
    urls.vocabularyTopic.delete,
    verifyJWT,
    verifyRoles( ROLES_OBJECT.EDITOR ),
    vocabularyTopicController.handleDelete,
  );

  router.put(
    urls.vocabularyTopic.update,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyTopicController.handleUpdate,
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
    verifyRoles(ROLES_OBJECT.EDITOR),
    photoController.handleUpload,
  );

  router.delete(urls.photo.delete, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), photoController.handleDestroy);

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

  router.get(urls.test.getUserAnswers, verifyJWT, verifyRoles(ROLES_OBJECT.USER), testController.handleGetUserAnswers);
  // Answers
  router.put(urls.answer.update, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), answerController.handleUpdateAnswers);


  // Correct Answers
  router.put( urls.correctAnswer.updateMany,
    // verifyJWT,
    // verifyRoles( ROLES_OBJECT.EDITOR ),
    correctAnswerController.handleUpdateManyByQuestionId
  )

  // User answer
  router.get(
    urls.userAnswer.create,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.USER),
    userAnswerController.handleCreateUserAnswer,
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
    urls.questionGroup.getAll,
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    questionGroupController.handleGetQuestionGroupsByPartId,
  );
  return app.use('/', router);
};

module.exports = initWebRoutes;

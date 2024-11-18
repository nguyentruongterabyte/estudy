import express from 'express';

// import middleware
import upload from '../middleware/uploadMiddleware';
import verifyJWT from '../middleware/verifyJWT';
import { ROLES_OBJECT } from '../config/rolesList';
import verifyRoles from '../middleware/verifyRoles';
import verifyUserOwnership from '../middleware/verifyUserOwnership';
// import controller
import userController from '../controllers/userController';
import vocabularyController from '../controllers/vocabularyController';
import testController from '../controllers/testController';
import audioController from '../controllers/audioController';
import photoController from '../controllers/photoController';
import answerController from '../controllers/answerController';
import questionController from '../controllers/questionController';
import questionGroupController from '../controllers/questionGroupController';
import urls from '../config/urls';
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
  router.post(
    '/api/vocabulary/create-topic',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyController.handleCreateVocabularyTopic,
  );
  // Audio
  router.get('/api/audio/get-by-question-id/:questionId', audioController.handleFindByQuestionId);

  router.post(urls.audio.create, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), audioController.handleSaveAudio);

  router.post(
    urls.audio.upload,
    upload.single('audio'),
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    audioController.handleUploadAudio,
  );

  // Photo
  router.post(
    urls.photo.upload,
    upload.single('photo'),
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    photoController.handleUploadPhoto,
  );

  router.post('/api/photo/delete-firebase', photoController.handleDeleteFirebasePhotoByUrl);

  // test
  router.post(urls.test.create, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleSaveTest);
  router.delete(urls.test.delete, verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleDeleteTest);

  // Answers
  router.put(urls.answer.update, answerController.handleUpdateAnswers);

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
    verifyRoles(ROLES_OBJECT.EDITOR),
    questionGroupController.handleGetQuestionGroupsByPartId,
  );
  return app.use('/', router);
};

module.exports = initWebRoutes;

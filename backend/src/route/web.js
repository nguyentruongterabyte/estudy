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
  router.post('/api/user/register', userController.handleNewUser);
  router.post('/api/user/login', userController.handleUserLogin);
  router.get('/api/user/refresh', userController.handleRefreshToken);
  router.get('/api/user/logout', userController.handleLogout);

  // vocabulary
  router.post(
    '/api/vocabulary/create-topic',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    vocabularyController.handleCreateVocabularyTopic,
  );
  // Audio
  router.get('/api/audio/get-by-question-id/:questionId', audioController.handleFindByQuestionId);

  // Photo
  router.post(
    '/api/photo/upload',
    upload.single('photo'),
    // verifyJWT,
    // verifyRoles(ROLES_OBJECT.EDITOR),
    photoController.handleUploadPhoto,
  );

  router.post('/api/photo/delete-firebase', photoController.handleDeleteFirebasePhotoByUrl);

  // test
  router.get(
    '/api/test/question-groups/:partId',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    testController.handleGetQuestionGroupsByPartId,
  );

  router.get(
    '/api/test/questions/:groupId',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR, ROLES_OBJECT.USER),
    testController.handleGetQuestionsByGroupId,
  );

  router.post(
    '/api/test/upload-audio',
    upload.single('audio'),
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    audioController.handleUploadAudio,
  );

  router.post('/api/test/create', verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), testController.handleSaveTest);

  router.post(
    '/api/test/question-photo',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    testController.handleCreateQuestionPhoto,
  );
  router.post('/api/test/create-audio', verifyJWT, verifyRoles(ROLES_OBJECT.EDITOR), audioController.handleSaveAudio);
  router.post(
    '/api/test/question-audio',
    verifyJWT,
    verifyRoles(ROLES_OBJECT.EDITOR),
    testController.handleCreateQuestionAudio,
  );

  // Answers
  router.put('/api/answer', answerController.handleUpdateAnswers);

  // Questions
  router.put('/api/question/correct-answer', questionController.handleUpdateCorrectAnswers);
  router.put('/api/question/photos', questionController.handleUpdatePhotos);
  router.put('/api/question/audios', questionController.handleUpdateAudios);

  // Question Group
  router.put('/api/question-group', questionGroupController.handleUpdate);
  return app.use('/', router);
};

module.exports = initWebRoutes;

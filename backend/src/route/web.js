import express from 'express';

import verifyJWT from '../middleware/verifyJWT';
import { ROLES_OBJECT } from '../config/rolesList';
import verifyRoles from '../middleware/verifyRoles';
import verifyUserOwnership from '../middleware/verifyUserOwnership';
// import controller
import userController from '../controllers/userController';
import vocabularyController from '../controllers/vocabularyController';

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
    verifyRoles(ROLES_OBJECT.ADMIN, ROLES_OBJECT.EDITOR),
    vocabularyController.handleCreateVocabularyTopic,
  );
  return app.use('/', router);
};

module.exports = initWebRoutes;

import express from "express";

// import controller
import userController from "../controllers/userController";
import vocabularyController from "../controllers/vocabularyController";

let router = express.Router();

let initWebRoutes = ( app ) => {
  // user
  router.get( '/api/user/get-all', userController.handleGetAllUser );
  router.post( '/api/user/register', userController.handleNewUser );
  router.post( '/api/user/login', userController.handleUserLogin );
  
  // vocabulary
  router.post('/api/vocabulary/create-topic', vocabularyController.handleCreateVocabularyTopic)
  return app.use( '/', router );
}

module.exports = initWebRoutes;
import express from "express";

// import controller

let router = express.Router();

let initWebRoutes = ( app ) => {
  return app.use( "/", router );
}

module.exports = initWebRoutes;
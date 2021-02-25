var express = require('express');
var router = express.Router();

module.exports = (db) => {

  /* GET home page. */
  router.get('/', async (req, res, next) => {
    res.status(200).json({
        app: process.env.APP_NAME,
        version: process.env.APP_VER
    });
  });

  return router;
}
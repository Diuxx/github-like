'use strict';

const express = require('express');
const router = express.Router();


module.exports = (db) => {

  /* get all users */
  router.get('/', async (req, res, next) => {
    const auth = req.currentUser || 'test';
    if (auth) {
      const users = await db.tables.users.findAll({ raw: true });
      res.status(200).json(users);
    }
    else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  /* get a user by id */
  router.get('/:id', (req, res, next) => {

    res.status(403).json({ message: 'Not authorized' });
  });

  /* create user */
  router.post('/', (req, res, next) => {

    res.status(403).json({ message: 'Not authorized' });
  });

  return router;
};
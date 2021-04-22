'use strict';

const express = require('express');
const { nanoid } = require('nanoid');

const utils = require(`../utils/utils`);
const router = express.Router();


module.exports = (db) => {

  /* get all users */
  router.get('/', async (req, res, next) => {
    const auth = req.currentUser;
    if (auth) {
      const users = await db.tables.users.findAll({ raw: true });
      res.status(200).json(users);
    }
    else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  /* get a user by id */
  router.get('/:id', async (req, res, next) => {
    let googleId = req.params.id;
    const user = await db.tables.users.findOne({
      where: { GoogleId: googleId }
    });
    if (user) {
      // --
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  });

  /* create user */
  router.post('/', async (req, res, next) => {
    let googleId = req.body.uid;
    let userName = req.body.displayName;

    if (utils.isNullOrEmpty(googleId) || utils.isNullOrEmpty(userName)) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    const id = nanoid();
    const user = await db.tables.users.create({
      Id: id,
      GoogleId: googleId,
      Name: userName
    });

    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  return router;
};
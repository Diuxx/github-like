'use strict';

const express = require('express');
const router = express.Router();

module.exports = (db) => {

    /* get all languages */
    router.get('/', async (req, res, next) => {
        const auth = req.currentUser;
        if (auth) {
          const langages = await db.tables.languages.findAll({ raw: true });
          res.status(200).json(langages);
        }
        else {
          res.status(403).json({ message: 'Not authorized' });
        }
    });

    /* get one language*/
    router.get('/:id', async (req, res, next) => {
      const auth = req.currentUser;
      if (auth) {
        const langage = await db.tables.languages.findByPk(req.params.id);
        if (langage === null) {
          res.status(404).json({ message: 'Not found' });
        } else {
          res.status(200).json(langage);
        }
      }
      else {
        res.status(403).json({ message: 'Not authorized' });
      }
    });

    return router;
};
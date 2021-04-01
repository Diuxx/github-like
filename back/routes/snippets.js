'use strict';

const express = require('express');
const snippet = require('../models/snippet');

const mkdirp = require("mkdirp");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const { nanoid } = require('nanoid');
const utils = require(`../utils/utils`);

module.exports = (db) => {

  /* get all snippets */
  router.get('/', async (req, res, next) => {
    const auth = req.currentUser;
    if (auth) {
      const snippetList = await db.tables.snippets.findAll({
        include: [{ 
          model: db.tables.users, as: 'User', attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: db.tables.files,
          as: 'Files',
          include: {
            model: db.tables.languages,
            as: 'Language',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      
      res.status(200).json(snippetList);
    }
    else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  /* get a snippet */
  router.get('/:id', async (req, res, next) => {
    const auth = req.currentUser;
    if (auth) {
      let snippetId = req.params.id;

      // find snippet by id
      const snippet = await db.tables.snippets.findOne({
        include: {
          model: db.tables.files,
          as: 'Files',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: { 
            model: db.tables.languages,
            as: 'Language',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        },
        where: { Id: snippetId },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });

      if (snippet)
      {
        let snippetJson = sequelizeObjectToJson(snippet);
        res.status(200).json(snippetJson);
      } else
      {
        res.status(404).json({ message: 'Not found' });
      }
    } else
    {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  /* create a snippet */
  router.post('/', async (req, res, next) => {
    const auth = req.currentUser;
    if (auth) {
      const id = nanoid();
      const snippetPath = `${snippetsRoot}\\${id}`;
      const snippetFilesPath = `${snippetsRoot}\\${id}\\files`;

      if (utils.isNullOrEmpty(req.body.Title) || utils.isNullOrEmpty(req.body.Desc))
      {
        res.status(400).json({ message: 'Bad Request' });
        return;
      }

      // create paths
      if (!fs.existsSync(snippetPath)) {
        try {
          mkdirSync(path.resolve(snippetPath));      // snippets path
          mkdirSync(path.resolve(snippetFilesPath)); // files path

          const snippet = await db.tables.snippets.create({ 
            Id: id,
            Title: utils.capitalize(req.body.Title),
            Desc: req.body.Desc,
            Repository: `public/snippets/${id}`,
            UserId: 'uid-f10b1f96'
          });

          if (snippet != null)
          {
            utils.calculateTf(snippet.toJSON());
          }

          res.status(200).json(snippet.toJSON());
        } catch(err) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      } else {
        res.status(409).json({ message: 'Resource already exists' });
      }
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });

  // utils functions
  const mkdirSync = function (dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (err) {
      if (err.code !== "EEXIST") throw err
    }
  }

  const sequelizeObjectToJson = function (object) {
    return JSON.parse(JSON.stringify(object));
  }
  return router;
};
'use strict';

const express = require('express');
const snippet = require('../models/snippet');
const router = express.Router();

module.exports = (db) => {

  /* get all snippets */
  router.get('/', async (req, res, next) => {
    const auth = req.currentUser;
    if (auth) {
      const snippets = await db.tables.snippets.findAll({ order: ['createdAt', 'DESC'], raw: true });

      for(const snippet of snippets) {
        let userName = await db.tables.users.findByPk(snippet.UserId, { attributes: ['Name'], raw: true });

        // update model
        snippet.User = userName.Name;
        snippet.Languages = await getSnippetLangages(db, snippet.Id);
      }

      res.status(200).json(snippets);
    }
    else {
      res.status(403).json({ message: 'Not authorized' });
    }
  });



  // utils functions
  async function getSnippetLangages(db, id) {
    let languages = [];
    const files = await db.tables.files.findAll({ include: [{ model: db.tables.languages }], where: { SnippetId: id }, raw: true });
    for(const f of files) {
      let language = await db.tables.languages.findByPk(f.LanguageId, { attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true });
      if (language && !languages.some(l => l.Id === language.Id)) {
        languages.push(language);
      }
    }
    return languages;
  }

  return router;
};
'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const { nanoid } = require('nanoid');

// utils
const utils = require(`../utils/utils`);

module.exports = (db) => {

    /* get a file */
    router.get('/:id', async (req, res, next) => {
        const auth = req.currentUser;
        if (auth) {
            let fileId = req.params.id;
            const file = await db.tables.files.findByPk(fileId);
            if (file) {
                const filePath = file.Url;
                const fileName = file.Name;
                fs.access(filePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
                    if (err) {
                        console.error(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
                        res.status(404).json({ message: 'Not found' });
                    } else {
                        console.log(`${file} exists, and it is writable`);
                        res.writeHead(200, {
                            "Content-Type": "application/octet-stream",
                            "Content-Disposition": "attachment; filename=" + fileName
                        });
                        fs.createReadStream(filePath).pipe(res);
                    }
                });
            } else
            {
                res.status(404).json({ message: 'Not found' });
            }
        } else
        {
          res.status(403).json({ message: 'Not authorized' });
        }
    });

    /* create a file */
    router.post('/', async (req, res, next) => {
        const auth = req.currentUser;
        if (auth) {
            console.log(req.body);
            if (utils.isNullOrEmpty(req.body.FileName) || 
                utils.isNullOrEmpty(req.body.LanguageId) || 
                utils.isNullOrEmpty(req.body.SnippetId) ||
                utils.isNullOrEmpty(req.body.Ext)) {
                res.status(400).json({ message: 'Bad Request' });
                return;
            }

            const id = nanoid();
            const filesPath = `${snippetsRoot}\\${req.body.SnippetId}\\files`;
           
            if (fs.existsSync(filesPath)) {
                const path = `public/snippets/${req.body.SnippetId}/files`
                const file = await db.tables.files.create({
                    Id: id,
                    Name: req.body.FileName,
                    FileName: req.body.FileName,
                    Url: `${path}/${req.body.FileName}.${req.body.Ext}`,
                    SnippetId: req.body.SnippetId,
                    LanguageId: req.body.LanguageId
                });

                if (file) {
                    fs.writeFile(file.Url, '-- new-file', function (err) {
                        if (err) throw err;
                        console.log(`${file.Url} - created`);
                    });
                }

                res.status(200).json(file);
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            res.status(403).json({ message: 'Not authorized' });
        }
    });

    return router;
};
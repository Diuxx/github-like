'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

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

    return router;
};
'use strict';

const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

// utils
const utils = require(`../utils/utils`);

module.exports = (db) => {

    // get all comments of snippet
    router.get('/:id', async (req, res, next) => {
        const auth = req.currentUser;
        if (auth) {
            let snippetId = req.params.id;
            const comments = await db.tables.comments.findAll({
                include: { 
                    model: db.tables.users, 
                    as: 'User', 
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                where: { SnippetId: snippetId },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if (comments) {
                let commentsJson = sequelizeObjectToJson(comments);
                res.status(200).json(commentsJson);
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } else {
            res.status(403).json({ message: 'Not authorized' });
        }
    });

    // create a comment
    router.post('/', async (req, res, next) => {
        const auth = req.currentUser;
        if (auth) {
            if (utils.isNullOrEmpty(req.body.snippet) ||
                utils.isNullOrEmpty(req.body.comment) || 
                utils.isNullOrEmpty(req.body.user)) {
                res.status(400).json({ message: 'Bad Request' });
                return;
            }

            const user = await db.tables.users.findOne({ where: { GoogleId: req.body.user.uid }});
            if (user) {
                const id = nanoid();
                const comment = await db.tables.comments.create({
                    Id: id,
                    Content: req.body.comment,
                    UserId: user.Id,
                    SnippetId: req.body.snippet
                });

                res.status(200).json(comment.toJSON());
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            res.status(403).json({ message: 'Not authorized' });
        }
    });

    const sequelizeObjectToJson = function (object) {
        return JSON.parse(JSON.stringify(object));
    }

    return router;
};
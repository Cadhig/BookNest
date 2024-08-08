const express = require('express');
const router = express.Router();
const Posts = require('../models/Posts.js');

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Posts.find()
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({
                message: 'Could not fetch posts'
            })
        })

})


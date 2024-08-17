const express = require('express');
const router = express.Router();
const Posts = require('../models/Posts.js');
const User = require('../models/User.js');

router.get('/', (req, res) => {
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Posts.find().sort({ createdAt: -1 })
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

router.post('/', (req, res) => {
    const { postText } = req.body
    console.log(postText)
    console.log(req.session.user.username)
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Posts.create({
        postText: postText,
        username: req.session.user.username,
        userId: req.session.user_id
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({
                message: 'Could not create post!'
            })
        })
})

module.exports = router
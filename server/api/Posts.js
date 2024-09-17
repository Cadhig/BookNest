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

router.get('/:username', (req, res) => {
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Posts.find({ username: req.params.username }).sort({ createdAt: -1 })
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

router.post('/', async (req, res) => {
    const { postText } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    console.log(req.session.user)
    try {
        const profilePicture = await User.find({ username: req.session.user.username }).populate({ path: 'profilePicture', strictPopulate: false }).exec()
        const newPost = await Posts.create({
            postText: postText,
            profilePicture: profilePicture[0].profilePicture,
            username: req.session.user.username,
            userId: req.session.user.uuid
        })
        await User.findOneAndUpdate({ username: newPost.username }, {
            $push: { posts: newPost._id }
        })
        return res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not create post!' });
    }
})

router.post('/likePost', async (req, res) => {
    const { postId } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        await Posts.findOneAndUpdate({ _id: postId }, {
            $push: { likes: req.session.user.id }
        })
        await User.findOneAndUpdate({ username: req.session.user.username }, {
            $push: { likes: postId }
        })
        return res.status(200).json({ success: 'able to like post' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not like post!' });
    }
})

router.put('/unlikePost', async (req, res) => {
    const { postId } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        await Posts.findOneAndUpdate({ _id: postId }, {
            $pull: { likes: req.session.user.id }
        })
        await User.findOneAndUpdate({ username: req.session.user.username }, {
            $pull: { likes: postId }
        })
        return res.status(200).json({ success: 'able to unlike post' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not unlike post!' });
    }
})

module.exports = router
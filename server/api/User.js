const express = require('express')
const User = require('../models/User.js')
const Posts = require('../models/Posts.js')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/test', (req, res) => {
    console.log('user test worked')
    return res.status(200).send('user test success')
})

router.get('/loggedInUser', async (req, res) => {
    try {
        const user = await User.find({ username: req.session.user.username }).select("-password")
            .populate({ path: 'books', strictPopulate: false })
            .populate({ path: 'followingPosts', strictPopulate: false, options: { sort: { createdAt: -1 } } })
            .exec()
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not retrieve posts' });
    }
})

router.post('/profile', async (req, res) => {
    const { username } = req.body
    if (username === 'user') {
        try {
            const user = await User.find({ username: req.session.user.username }).select("-password")
                .populate({ path: 'posts', strictPopulate: false, options: { sort: { createdAt: -1 } } })
                .populate({ path: 'likes', strictPopulate: false, options: { sort: { createdAt: -1 } } })
                .exec()
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Could not retrieve posts' });
        }
    }
    try {
        const user = await User.find({ username: username }).select("-password")
            .populate({ path: 'posts', strictPopulate: false, options: { sort: { createdAt: -1 } } })
            .populate({ path: 'likes', strictPopulate: false, options: { sort: { createdAt: -1 } } })
            .exec()
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const loggedInUserIsFollowingTargetUser = user[0].followers.find((loggedInUser) => req.session.user.id === loggedInUser.toString())
        if (loggedInUserIsFollowingTargetUser === undefined) {
            return res.status(200).json([{ user: user }, { isLoggedInUserFollowing: false }]);
        }
        return res.status(200).json([{ user: user }, { isLoggedInUserFollowing: true }])
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not retrieve posts' });
    }
})

router.post('/bookmarks', async (req, res) => {
    const { username } = req.body
    if (username === 'user') {
        try {
            const userBooks = await User.find({ username: req.session.user.username }).select("-password")
                .populate({ path: 'books', strictPopulate: false, options: { sort: { createdAt: -1 } } })
                .exec()
            if (!userBooks) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(userBooks);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Could not retrieve books' });
        }
    }
    try {
        const userBooks = await User.find({ username: username }).select("-password")
            .populate({ path: 'books', strictPopulate: false })
            .exec()
        if (!userBooks) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userBooks);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not retrieve books' });
    }
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        const hash = await bcrypt.hash(password, 13)
        const newUser = await User.create({
            username: username,
            password: hash
        })
        req.session.user = {
            id: newUser._id,
            username,
            password,
            isLoggedIn: true
        }
        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.status(200).send();
        });
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: 'Account Already Exists' })
        return
    }

})


router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username })
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'invalid credentials' })
        }
        req.session.user = {
            id: user._id,
            username,
            password,
            isLoggedIn: true
        }
        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.status(200).send();
        });
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/logout', async (req, res, next) => {
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        await req.session.destroy();
    } catch (err) {
        console.error('Error logging out:', err);
        return next(new Error('Error logging out'));
    }

    res.status(200).send();
})


router.put('/changePass', async (req, res) => {
    const { password, oldPassword } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    const user = await User.findOne({ username: req.session.user.username })
    const passwordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ error: 'previous password invalid' })
    }
    const hash = await bcrypt.hash(password, 13)
    await User.findOneAndUpdate({ username: user.username }, { password: hash })
        .then(() => {
            return res.status(200).json({ message: "Password Updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Password!'
            })
        })
})

router.put('/location', async (req, res) => {
    const { location } = req.body
    const user = await User.findOne({ username: req.session.user.username })

    await User.findOneAndUpdate({ username: user.username }, { location: location })
        .then(() => {
            return res.status(200).json({ message: "Location updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Location!'
            })
        })
})

router.put('/profilePicture', async (req, res) => {
    const { AWSImageUrl } = req.body

    const user = await User.findOne({ username: req.session.user.username })
    await User.findOneAndUpdate({ username: user.username }, { profilePicture: AWSImageUrl })
    await Posts.updateMany({ username: user.username }, { profilePicture: AWSImageUrl })
        .then(() => {
            return res.status(200).json({ message: "Profile Picture updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Profile Picture!'
            })
        })
})

router.put('/coverPicture', async (req, res) => {
    const { AWSImageUrl } = req.body

    const user = await User.findOne({ username: req.session.user.username })
    await User.findOneAndUpdate({ username: user.username }, { coverPicture: AWSImageUrl })
        .then(() => {
            return res.status(200).json({ message: "Cover Picture updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Cover Picture!'
            })
        })
})

router.put('/bio', async (req, res) => {
    const { bio } = req.body
    const user = await User.findOne({ username: req.session.user.username })

    await User.findOneAndUpdate({ username: user.username }, { bio: bio })
        .then(() => {
            return res.status(200).json({ message: "Bio updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Bio!'
            })
        })
})

router.put('/birthday', async (req, res) => {
    const { birthday } = req.body
    const user = await User.findOne({ username: req.session.user.username })

    await User.findOneAndUpdate({ username: user.username }, { birthday: birthday })
        .then(() => {
            return res.status(200).json({ message: "Birthday updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update Birthday!'
            })
        })
})

router.post('/follow', async (req, res) => {
    const { userId } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        await User.findOneAndUpdate({ _id: userId }, {
            $push: { followers: req.session.user.id }
        })
        await User.findOneAndUpdate({ username: req.session.user.username }, {
            $push: { following: userId }
        })
        return res.status(200).json({ success: 'able to like post' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not like post!' });
    }
})

router.post('/unfollow', async (req, res) => {
    const { userId } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        await User.findOneAndUpdate({ _id: userId }, {
            $pull: { followers: req.session.user.id }
        })
        await User.findOneAndUpdate({ username: req.session.user.username }, {
            $pull: { following: userId }
        })
        return res.status(200).json({ success: 'able to like post' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not like post!' });
    }
})

module.exports = router
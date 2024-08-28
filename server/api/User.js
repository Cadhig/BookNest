const express = require('express')
const User = require('../models/User.js')
const Posts = require('../models/Posts.js')
const Books = require('../models/Books.js')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/loggedInUser', async (req, res) => {
    console.log(req.session)
    try {
        const user = await User.find({ username: req.session.user.username }).select("-password")
            .populate({ path: 'books', strictPopulate: false })
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
    console.log(req.session)
    const { username } = req.body
    if (username === 'user') {
        try {
            const user = await User.find({ username: req.session.user.username }).select("-password")
                .populate({ path: 'posts', strictPopulate: false, options: { sort: { createdAt: -1 } } })
                .exec()
            console.log(user)
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
        const user = await User.find({ username: username }).select("-password").populate({ path: 'posts', strictPopulate: false }).exec()
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
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
            console.log(userBooks)
            return res.status(200).json(userBooks);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Could not retrieve books' });
        }
    }
    // try {
    //     const user = await User.find({ username: username }).select("-password").populate({ path: 'books', strictPopulate: false }).exec()
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }

    //     return res.status(200).json(user);
    // } catch (err) {
    //     console.error(err);
    //     return res.status(400).json({ message: 'Could not retrieve books' });
    // }
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const hash = await bcrypt.hash(password, 13)
    User.create({
        username: username,
        password: hash
    })
        .then((response) => {
            return res.json(response)
        })
        .catch((err) => {
            console.error(err)
            res.status(400).json({ error: 'Account Already Exists' })
            return
        })
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
        res.status(200).send()
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

module.exports = router
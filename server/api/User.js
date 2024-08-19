const express = require('express')
const User = require('../models/User.js')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
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
        if (!user) {
            return res.send('User not found')
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'invalid credentials' })
        }
        req.session.user_id = user._id
        req.session.user = {
            uuid: req.sessionID,
            username,
            password,
            isLoggedIn: true
        }
        console.log(req.session)
        console.log(req.session.user_id)
        req.session.save()
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
    console.log(user)
    console.log(req.session.user.password)
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
    await User.where(user_id).equals(req.session.user_id).updateOne({
        location: location,
    })
        .then(() => {
            return res.status(200).json({ message: "Location Updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update location!'
            })
        })
})

router.put('/bio', async (req, res) => {
    const { bio } = req.body
    await User.where(user_id).equals(req.session.user_id).updateOne({
        bio: bio,
    })
        .then(() => {
            return res.status(200).json({ message: "Bio Updated!" })
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                message: 'Cannot Update bio!'
            })
        })
})

module.exports = router
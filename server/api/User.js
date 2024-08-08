const express = require('express')
const User = require('../models/User.js')
const router = express.Router()

router.get('/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body
    User.create({
        username: username,
        password: password
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
    const { username } = req.body
    req.session.user = {
        username,
        isLoggedIn: true
    }
    try {
        req.session.save()
        console.log(req.session.user.username)
    } catch (err) {
        console.error('Error saving to session storage:', err)
        return next(new Error('Error creating user'))
    }
    res.status(200).send()
})

router.post('/logout', async (req, res, next) => {
    try {
        await req.session.destroy();
    } catch (err) {
        console.error('Error logging out:', err);
        return next(new Error('Error logging out'));
    }

    res.status(200).send();
})


router.put('/changePass', async (req, res) => {
    const { password } = req.body
    await User.where(user_id).equals(req.session.user_id).updateOne({
        password: password,
    })
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
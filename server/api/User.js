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
    const user = User.findOne({ username: username })
        .then(async (response) => {
            if (!user) {
                return res.send('User not found')
            }
            bcrypt.compare(password, response.password, function (err, result) {
                if (result !== true) {
                    return res.status(500).json(err)
                }
                req.session.user = {
                    username,
                    password,
                    isLoggedIn: true
                }
                req.session.save()
                res.status(200).send()
            })
        })
        .catch((err) => {
            console.error(err)
            res.status(400).json({ error: 'Internal Error' })
            return
        })
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
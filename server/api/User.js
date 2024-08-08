const express = require('express')
const User = require('../models/User.js')
const router = express.Router()

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

router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.where("username").equals(req.body.username).where("password").equals(req.body.password).findOne()
        if (foundUser === null) {
            res.status(401).json({ error: 'Incorrect login credentials' })
        }
        req.session.user_id = foundUser.id
        req.session.authorized = true
        res.status(200).json({ success: 'Logged in' })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/findUser/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            console.error(err)
        })
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
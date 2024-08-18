const express = require('express');
const router = express.Router();
const Books = require('../models/Books.js')

router.post('/saved', (req, res) => {
    const { bookName, bookIsbn } = req.body

    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Books.create({
        bookName: bookName,
        bookIsbn: bookIsbn,
        username: req.session.user.username
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({
                message: 'Could not add book'
            })
        })
})

module.exports = router
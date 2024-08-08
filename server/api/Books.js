const express = require('express');
const router = express.Router();
const Books = require('../models/Books.js')

router.post('/tbr', (req, res) => {
    const { bookUrl, bookId } = req.body
    if (!req.session.user_id) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    Books.where("user_id").equals(req.session.user_id).create({
        bookUrl: bookUrl,
        bookId: bookId
    })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            console.error(err)
            return res.status(400).json({
                message: 'Could add book'
            })
        })
})
const express = require('express');
const router = express.Router();
const Books = require('../models/Books.js')
const User = require('../models/User.js');

router.post('/saved', async (req, res) => {
    const { bookName, bookIsbn, bookImage } = req.body

    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const newBook = await Books.create({
            bookName: bookName,
            bookIsbn: bookIsbn,
            bookImage: bookImage,
            username: req.session.user.username
        })
        await User.findOneAndUpdate({ username: newBook.username }, {
            $push: { books: newBook._id }
        })
        return res.status(200).json(newBook);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not save book!' });
    }

})

router.delete('/unsave', async (req, res) => {
    const { bookIsbn } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const removeBook = await Books.findOneAndDelete({ bookIsbn: bookIsbn, username: req.session.user.username })
        await User.findOneAndUpdate({ username: removeBook.username }, {
            $pull: { books: removeBook._id }
        })
        return res.status(200).json(removeBook);
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not remove book!' });
    }
})

module.exports = router
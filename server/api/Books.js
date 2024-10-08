const express = require('express');
const router = express.Router();
const Books = require('../models/Books.js')
const User = require('../models/User.js');
const Reviews = require('../models/Reviews.js');
const BestSellers = require('../models/BestSellerList.js');

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

router.post('/review', async (req, res) => {
    const { bookIsbn, bookName, bookImage, reviewText, reviewRating } = req.body
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const hasUserReviewed = await Reviews.find({ bookIsbn: bookIsbn, username: req.session.user.username })
        if (hasUserReviewed.length > 0) {
            res.status(400).json(false)
            return
        }
        console.log(hasUserReviewed)
        const review = await Reviews.create({
            bookName: bookName,
            bookIsbn: bookIsbn,
            bookImage: bookImage,
            username: req.session.user.username,
            reviewText: reviewText,
            reviewRating: reviewRating
        })
        await User.findOneAndUpdate({ username: req.session.user.username }, {
            $push: { reviews: review._id }
        })
        await Books.findOneAndUpdate({ bookIsbn: bookIsbn }, {
            $push: { reviews: review._id }
        })
        return res.status(200).json(review)
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Could not post review!' });
    }
})

router.get('/reviews/:bookIsbn', async (req, res) => {
    const bookIsbn = req.params.bookIsbn
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const reviews = await Reviews.find({ bookIsbn: bookIsbn })
        if (!reviews) {
            return res.status(404).json({ message: 'Reviews not found' })
        }
        return res.status(200).json(reviews)
    } catch (err) {
        console.error(err)
        return res.status(400).json({ message: 'Could not retrieve reviews' })
    }
})

router.get('/bestSellerList', async (req, res) => {
    if (!req.sessionID) {
        return res.status(401).json({ error: "Unauthorized" })
    };
    try {
        const bestSellerList = await BestSellers.find()
        if (!bestSellerList) {
            return res.status(500).json({ message: "failure fetching best seller list" })
        }
        return res.status(200).json(bestSellerList)
    } catch (err) {
        console.error(err)
        return res.status(400).json({ message: 'Could not retrieve reviews' })
    }
})

module.exports = router
const mongoose = require('mongoose')

function formatDate(createdAt) {
    return createdAt.toString()
}

const reviewSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookIsbn: {
        type: String,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        userId: mongoose.SchemaType.ObjectId,
        ref: "User"
    },
    reviewText: {
        type: String,
        required: true
    },
    reviewRating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },

})

module.exports = mongoose.model("Reviews", reviewSchema)
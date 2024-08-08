const mongoose = require('mongoose')

function formatDate(createdAt) {
    return createdAt.toString()
}

const bookSchema = new mongoose.Schema({
    bookUrl: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Books", bookSchema)
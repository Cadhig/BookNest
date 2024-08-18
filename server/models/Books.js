const mongoose = require('mongoose')

function formatDate(createdAt) {
    return createdAt.toString()
}

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookIsbn: {
        type: String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        userId: mongoose.SchemaType.ObjectId,
        ref: "User"
    },

})

module.exports = mongoose.model("Books", bookSchema)
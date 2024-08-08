const mongoose = require('mongoose')
const commentSchema = require('./Comments.js')

function formatDate(createdAt) {
    return createdAt.toString()
}

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },
    username: {
        type: [mongoose.SchemaTypes.String],
        userId: [mongoose.SchemaType.ObjectId],
        ref: "User"
    },
    // comments: [commentSchema]
})

module.exports = mongoose.model("Post", postSchema)
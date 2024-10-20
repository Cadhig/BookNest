const mongoose = require('mongoose')

function formatDate(createdAt) {
    return createdAt.toString()
}

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    },
    username: {
        type: [mongoose.SchemaTypes.String],
        required: true
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Posts"
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    }

})

module.exports = mongoose.model("Comments", commentSchema)
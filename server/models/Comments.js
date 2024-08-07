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
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    }

})

module.exports = mongoose.model("Comments", commentSchema)
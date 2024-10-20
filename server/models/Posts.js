const mongoose = require('mongoose')

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
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },
    username: {
        type: mongoose.SchemaTypes.String,
        userId: mongoose.SchemaType.ObjectId,
        ref: "User"
    },
    profilePicture: {
        type: mongoose.SchemaTypes.String,
        userId: mongoose.SchemaType.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comments"
    }]
})

module.exports = mongoose.model("Posts", postSchema)
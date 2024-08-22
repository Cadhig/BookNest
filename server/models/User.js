const mongoose = require('mongoose')
const Posts = require('./Posts.js')

function formatDate(createdAt) {
    return createdAt.toString()
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    birthday: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],

    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    saved: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Books"
    }
})

module.exports = mongoose.model("User", userSchema)
const mongoose = require('mongoose')

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
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }]
})

module.exports = mongoose.model("User", userSchema)
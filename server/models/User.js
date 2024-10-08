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
    profilePicture: {
        type: String,
        default: "https://book-nest-image-store.s3.us-east-2.amazonaws.com/aceb8f4bc5cdba79301e572528559e1a"
    },
    coverPicture: {
        type: String,
        default: "https://book-nest-image-store.s3.us-east-2.amazonaws.com/bd95ad98b2f6f24de784908385a5f95f"
    },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    followingPosts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Posts" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }]
})

module.exports = mongoose.model("User", userSchema)
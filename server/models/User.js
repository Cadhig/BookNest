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
    bio: {
        type: String
    },
    location: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        get: formatDate
    },
    posts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Posts"
    },
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    tbr: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Books"
    },
    library: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Books"
    }

})

module.exports = mongoose.model("User", userSchema)
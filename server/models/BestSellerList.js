const mongoose = require('mongoose')

const bestSellerSchema = new mongoose.Schema({
    books: Array,
    updated: String
})

module.exports = mongoose.model("BestSellers", bestSellerSchema)
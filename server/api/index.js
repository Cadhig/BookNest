const router = require('express').Router()
const userApi = require('./User.js')
const postsApi = require('./Posts.js')
const booksApi = require('./Books.js')

router.use('/api/user', userApi)
router.use('/api/posts', postsApi)
router.use('/api/books', booksApi)

module.exports = router
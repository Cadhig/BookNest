const router = require('express').Router()
const userApi = require('./User.js')
const postsApi = require('./Posts.js')

router.use('/api/user', userApi)
router.use('/api/posts', postsApi)

module.exports = router
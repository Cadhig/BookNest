const router = require('express').Router()
const userApi = require('./User.js')

router.use('/api/user', userApi)

module.exports = router
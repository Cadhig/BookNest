const express = require('express')
const apiRoutes = require('./api')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost/BookNest")

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/BookNest"
    })
}));

app.use(apiRoutes)

app.listen(3000, () => {
    console.log('listening on 3000')
})
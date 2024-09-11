const express = require('express')
const apiRoutes = require('./api')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
const app = express()

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173' || process.env.ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions))
app.use(session({
    secret: 'my-secret',
    resave: false,
    cookie: {
        secure: false,
    },
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/BookNest" || process.env.MONGOURL,
    })
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost/BookNest" || process.env.MONGOURL)


app.use(apiRoutes)

app.listen(3000, () => {
    console.log('listening on 3000')
})
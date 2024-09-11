const express = require('express')
const apiRoutes = require('./api')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
const app = express()

const cors = require('cors')

const corsOptions = {
    origin: process.env.ORIGIN,
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
        mongoUrl: process.env.MONGO_URL,
    })
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    console.log('test')
    return res.status(200).send('this test worked')
})

app.use(apiRoutes)

app.listen(3000, () => {
    console.log('listening on 3000')
})
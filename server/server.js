const express = require('express')
const apiRoutes = require('./api')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const request = require('request')
require('dotenv').config()
const app = express()

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost/BookNest")

app.use(session({
    secret: 'my-secret',
    resave: false,
    cookie: {
        secure: false,
    },
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/BookNest",
    })
}));

app.get('/nytApi', async (req, res) => {
    request({
        method: "GET",
        uri: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`,
    }, function (error, response, body) {
        if (error) {
            console.log(error)
            return
        }
        const data = response.body
        const apiData = JSON.parse(data)
        if (response.statusCode === 200) {
            return res.json({ apiData })
        } else {
            return console.log('error')
        }
    }
    )
})

app.use(apiRoutes)

app.listen(3000, () => {
    console.log('listening on 3000')
})
const express = require('express');
const apiRoutes = require('./api');
const mongoose = require('mongoose');
const session = require('express-session');
const generateUploadURL = require('./services/s3.js');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const app = express();
const cron = require('node-cron');

const cors = require('cors');
const BestSellerList = require('./models/BestSellerList.js');

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoutes);
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    console.log('test');
    return res.status(200).send('this test worked');
});

app.get('/s3', async (req, res) => {
    const url = await generateUploadURL();
    return res.status(200).send({ url });
})

async function retrieveBestSellerList() {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`);
        const bestSellerList = await response.json();
        const newBestSellerList = await BestSellerList.findOneAndUpdate({ updated: "WEEKLY" }, {
            books: bestSellerList.results.books,
            updated: bestSellerList.results.updated
        });
        if (newBestSellerList === null) {
            await BestSellerList.create({
                books: bestSellerList.results.books,
                updated: bestSellerList.results.updated
            });
        }
        console.log(newBestSellerList)
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error retrieving or saving data:', error);
    }
}

cron.schedule('* * * * *', retrieveBestSellerList);


app.listen(3000, () => {
    console.log('listening on ' + 3000);
    console.log('allowed origin = ' + process.env.ORIGIN);
})
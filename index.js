const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();


const myAsyncFunction = () => {
    const pr = new Promise((resolve) => {
        resolve(true);
    });
    return pr;
}
const intApp = () => {
    const promise = new Promise((resolve, reject) => {

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        const moviesRouter = require('./routes/moviesRoute');
        app.use('/movie', moviesRouter);



        mongoose.connect(process.env.DATABASE_URL)
            .then(() => {
                resolve(app);
            });
        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));

    });
    return promise;
};

module.exports = intApp();

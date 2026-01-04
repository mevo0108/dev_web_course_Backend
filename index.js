const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const moviesRouter = require('./routes/moviesRoute');
app.use('/movie', moviesRouter);

// 404 handler for routes not found
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

module.exports = app;

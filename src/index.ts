import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moviesRouter from './routes/moviesRoute';
import commentsRouter from './routes/CommentsRoute';

const app = express();
dotenv.config({ path: '.env.dev' });

app.use(express.json());
app.use('/movie', moviesRouter);
app.use('/comment', commentsRouter);
const initApp = () => {

    const promise = new Promise<express.Express>((resolve, reject) => {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            reject('DATABASE_URL is not defined in environment variables');
            return;
        }
        mongoose
            .connect(dbUrl)
            .then(() => {
                resolve(app);
            });
        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));

    });
    return promise;
};

export default initApp;
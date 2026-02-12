import request from 'supertest';
import initApp from '../index'; // Adjust the path as necessary
import movies from '../models/moviesModel';
import { Express } from 'express';



type CommentData = {
    messsage: string;
    movieId: string;
    userId: string;
    postedAt: Date;
    _id?: string;
}

const commentsList: CommentData[] = [
    {
        messsage: "Great post!",
        movieId: "11111",
        userId: "22222",
        postedAt: new Date(Date.now()),
    },
    {
        messsage: "I totally agree with you.",
        movieId: "333333",
        userId: "444444",
        postedAt: new Date(Date.now()),
    },
    {
        messsage: "Thanks for sharing your thoughts.",
        movieId: "333333",
        userId: "444444",
        postedAt: new Date(Date.now()),
    }
];


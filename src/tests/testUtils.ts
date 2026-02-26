import { Express } from "express";
import request from "supertest";
import User from "../models/userModel";

export type MoviesData = {
    title: string;
    year: number;
    _id?: string;
};

export const moviesData: MoviesData[] = [
    {
        title: "Inception",
        year: 2010
    },
    {
        title: "The Matrix",
        year: 1999
    },
    {
        title: "Interstellar",
        year: 2014
    }
]

export const singleMovieData: MoviesData = {
    title: "Inception",
    year: 2010
};

export type UserData = {
    email: string;
    password: string;
    token: string;
    _id: string;
}

export const userData: UserData = {
    email: "berrebimevo@test.com",
    password: "testpasswordMovies",
    token: "",
    _id: "",
};


export type CommentsData = {
    message: string;
    MovieId: string;
    userId: string;
    _id?: string;
}

export const commentsData: CommentsData[] = [
    {
        message: "Great post!",
        MovieId: "11111",
        userId: "22222",
    },
    {
        message: "I totally agree with you.",
        MovieId: "333333",
        userId: "444444",
    },
    {
        message: "Thanks for sharing your thoughts.",
        MovieId: "333333",
        userId: "444444",
    }
];


export const registerTestUser = async (app: Express) => {
    await User.deleteMany({ email: userData.email });

    const res = await request(app).post('/auth/register')
        .send({
            email: userData.email,
            password: userData.password
        });
    userData._id = res.body._id;
    userData.token = res.body.token;
}   
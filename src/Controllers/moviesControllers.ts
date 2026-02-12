import movieModel from '../models/moviesModel';
import { Request, Response } from 'express';

const getAllMovies = async (req: Request, res: Response) => {
    try {
        const year = req.query.year; // to filter by year if provided
        if (year) {
            const moviesByYear = await movieModel.find({ year: Number(year) });
            return res.json(moviesByYear);
        }
        const movies = await movieModel.find();
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json("error retrieving movies");
    }
};

const getMovieById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).json("error retrieving movie");
    }
};

const createMovie = async (req: Request, res: Response) => {
    const movieData = req.body; // Assuming body-parser middleware is used
    console.log('Received movie data:', movieData);
    try {
        const newMovie = await movieModel.create(movieData);
        res.status(201).json(newMovie);
    } catch (err) {
        console.error(err);
        res.status(500).json("error creating movie");
    }
};

const deleteMovie = async (req: Request, res: Response) => {
    const idDeletedMovie = req.params.id;

    try {
        const deletedMovie = await movieModel.findByIdAndDelete(idDeletedMovie);
        res.json({ message: `Movie ${deletedMovie?.title} deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json("error deleting movie");
    }
};

const updateMovie = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedMovieData = req.body;

    try {
        // Implementation for updating the movie goes here
        const movie = await movieModel.findByIdAndUpdate(id, updatedMovieData, {
            new: true,
        });
        res.json(movie);

    } catch (err) {
        console.error(err);
        res.status(500).json("error updating movie");
    }
};

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
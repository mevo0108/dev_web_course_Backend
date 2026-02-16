import movieModel from '../models/moviesModel';
import { Request, Response } from 'express';
import baseController from './baseController';


const getAllMovies = async (req: Request, res: Response) => {
    baseController.getAll(req, res, movieModel);
}

const getMovieById = async (req: Request, res: Response) => {
    baseController.getById(req, res, movieModel);
}

const createMovie = async (req: Request, res: Response) => {
    baseController.create(req, res, movieModel);
}

const deleteMovie = async (req: Request, res: Response) => {
    baseController.del(req, res, movieModel);
}

const updateMovie = async (req: Request, res: Response) => {
    baseController.update(req, res, movieModel);
}

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
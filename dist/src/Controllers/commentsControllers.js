"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentsModel_1 = __importDefault(require("../models/commentsModel"));
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieID = req.query.movieId; // to filter by movieID if provided
        if (movieID) {
            const commentsByMovie = yield commentsModel_1.default.find({ movieId: movieID });
            return res.json(commentsByMovie);
        }
        const comments = yield commentsModel_1.default.find();
        res.json(comments);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error retrieving comments");
    }
});
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const movie = yield movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error retrieving movie");
    }
});
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = req.body; // Assuming body-parser middleware is used
    console.log('Received movie data:', movieData);
    try {
        const newMovie = yield movieModel.create(movieData);
        res.status(201).json(newMovie);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error creating movie");
    }
});
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idDeletedMovie = req.params.id;
    try {
        const deletedMovie = yield movieModel.findByIdAndDelete(idDeletedMovie);
        res.json({ message: `Movie ${deletedMovie === null || deletedMovie === void 0 ? void 0 : deletedMovie.title} deleted successfully` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error deleting movie");
    }
});
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedMovieData = req.body;
    try {
        // Implementation for updating the movie goes here
        const movie = yield movieModel.findByIdAndUpdate(id, updatedMovieData, {
            new: true,
        });
        res.json(movie);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error updating movie");
    }
});
exports.default = {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
//# sourceMappingURL=commentsControllers.js.map
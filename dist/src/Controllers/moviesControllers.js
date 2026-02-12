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
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year; // to filter by year if provided
        if (year) {
            const moviesByYear = yield moviesModel_1.default.find({ year: Number(year) });
            return res.json(moviesByYear);
        }
        const movies = yield moviesModel_1.default.find();
        res.json(movies);
    }
    catch (err) {
        console.error(err);
        res.status(500).json("error retrieving movies");
    }
});
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const movie = yield moviesModel_1.default.findById(id);
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
        const newMovie = yield moviesModel_1.default.create(movieData);
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
        const deletedMovie = yield moviesModel_1.default.findByIdAndDelete(idDeletedMovie);
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
        const movie = yield moviesModel_1.default.findByIdAndUpdate(id, updatedMovieData, {
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
//# sourceMappingURL=moviesControllers.js.map
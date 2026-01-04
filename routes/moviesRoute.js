const express = require('express');
const router = express.Router();
const moviesController = require('../Controllers/moviesControllers');

// GET all movies and POST new movie
router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.createMovie);

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController.getMovieById);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
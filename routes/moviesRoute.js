const express = require('express');
const router = express.Router();
const moviesController = require('../Controllers/moviesControllers');

router.get('/', moviesController.getAllMovies);

router.get('/:id', moviesController.getMovieById);

router.post('/', moviesController.createMovie);

router.delete('/:id', moviesController.deleteMovie);

router.put('/:id', moviesController.updateMovie);

module.exports = router;
import express from 'express';
import moviesController from '../Controllers/moviesControllers';

const router = express.Router();

// GET all movies and POST new movie
router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.createMovie);

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController.getMovieById);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

export default router;
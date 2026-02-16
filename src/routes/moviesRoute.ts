import express from 'express';
import moviesController from '../Controllers/moviesController';

const router = express.Router();

// GET all movies and POST new movie
router.get('/', moviesController.getAll.bind(moviesController));
router.post('/', moviesController.create.bind(moviesController));

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController.getById.bind(moviesController));
router.put('/:id', moviesController.update.bind(moviesController));
router.delete('/:id', moviesController.del.bind(moviesController));

export default router;
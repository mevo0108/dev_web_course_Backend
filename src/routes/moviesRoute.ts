import express from 'express';
import moviesController from '../Controllers/moviesController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// GET all movies and POST new movie
router.get('/', moviesController.getAll.bind(moviesController));

router.post('/', authMiddleware, moviesController.create.bind(moviesController)); //just to a connected user, so we will add auth middleware

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', moviesController.getById.bind(moviesController));

router.put('/:id', authMiddleware, moviesController.update.bind(moviesController)); //just to the owner of the movie, so we will add auth middleware

router.delete('/:id', authMiddleware, moviesController.del.bind(moviesController)); //just to the owner of the movie, so we will add auth middleware

export default router;
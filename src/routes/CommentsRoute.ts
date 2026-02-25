import express from 'express';
import commentsController from '../Controllers/commentsController';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();


// GET all comments and POST new comment
router.get('/', commentsController.getAll.bind(commentsController));

router.post('/', commentsController.create.bind(commentsController)); //just to a connected user, so we will add auth middleware

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', commentsController.getById.bind(commentsController));

router.put('/:id', commentsController.update.bind(commentsController)); //just to a connected user and comment creator, so we will add auth middleware

router.delete('/:id', commentsController.del.bind(commentsController)); //just to a connected user and comment creator, so we will add auth middleware


export default router;
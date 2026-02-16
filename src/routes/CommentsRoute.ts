import express from 'express';
import commentsController from '../Controllers/commentsController';

const router = express.Router();


// GET all comments and POST new comment
router.get('/', commentsController.getAll.bind(commentsController));
router.post('/', commentsController.create.bind(commentsController));

// GET, PUT, DELETE by ID (must come after root routes)
router.get('/:id', commentsController.getById.bind(commentsController));
router.put('/:id', commentsController.update.bind(commentsController));
router.delete('/:id', commentsController.del.bind(commentsController));


export default router;
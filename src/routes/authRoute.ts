import express from 'express';
import authController from '../Controllers/authController';

const router = express.Router();

// GET all auths and POST new auth
router.post('/register', authController.register);

router.post('/login', authController.login);


export default router;
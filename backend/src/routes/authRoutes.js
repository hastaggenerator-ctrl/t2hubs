import express from 'express';
import { body } from 'express-validator';
import { forgotPassword, login, me, register, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), validate], register);
router.post('/login', [body('email').isEmail(), body('password').notEmpty(), validate], login);
router.post('/forgot-password', [body('email').isEmail(), validate], forgotPassword);
router.post('/reset-password/:token', [body('password').isLength({ min: 6 }), validate], resetPassword);
router.get('/me', protect, me);

export default router;


import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { generate, verify } from '../controllers/otpController.js';

const router = express.Router();

router.route('/generate').post(authMiddleware, generate);
router.route('/verify').post(authMiddleware, verify);

export default router
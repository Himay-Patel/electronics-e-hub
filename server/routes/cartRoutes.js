import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { generate, getDetails, modify } from '../controllers/cartController.js';

const router = express.Router();
router.route('/generate').post(authMiddleware, generate);
router.route('/modify').post(authMiddleware, modify);
router.route('/:_id').get(authMiddleware, getDetails);
export default router;
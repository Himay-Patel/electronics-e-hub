import express from 'express';
import { allOrders, generateOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(allOrders);
router.route('/generate').post(authMiddleware, generateOrder);

export default router;
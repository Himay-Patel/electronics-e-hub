import express from 'express';
import { allOrders, generateOrder, totalSales, salestat } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(allOrders);
router.route('/generate').post(authMiddleware, generateOrder);
router.route('/totalsales').get(totalSales);
router.route('/salestatic').get(salestat);

export default router;
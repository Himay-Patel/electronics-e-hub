import express from 'express';
import { allOrders, generateOrder, totalSales, salestat, totalProductsale } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(allOrders);
router.route('/generate').post(authMiddleware, generateOrder);
router.route('/totalsales').get(totalSales);
router.route('/salestatic').get(salestat);
router.route('/totalproductsale').get(totalProductsale);

export default router;
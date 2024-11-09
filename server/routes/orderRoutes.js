import express from 'express';
import { allOrders, generateOrder, totalSales, salestat, totalProductsale, orderdetail } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(allOrders);
router.route('/generate').post(authMiddleware, generateOrder);
router.route('/totalsales').get(totalSales);
router.route('/salestatic').get(salestat);
router.route('/totalproductsale').get(totalProductsale);
router.route('/orderdetail/:_id').get(orderdetail);

export default router;
import express from 'express'
import { addProduct, getTrendingProducts, getLastestProducts, deleteProduct, getAllProducts, getProductById, updateProduct, getProductColours } from '../controllers/productController.js';
import configStorage from '../config/multer.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/trending').get(getTrendingProducts);
router.route('/latest').get(getLastestProducts);
router.route('/add').post(configStorage('/image/product').array('images'), addProduct);
router.route('/:_id').get(getProductById);
router.route('/update').post(configStorage('/image/product').array('images'), updateProduct);
router.route('/delete').post(deleteProduct);
router.route('/colors/:name').get(getProductColours);

export default router
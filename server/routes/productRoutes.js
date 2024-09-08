import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import configStorage from '../config/multer.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/add').post(configStorage('/image/product').array('images'), addProduct);
router.route('/:_id').get(getProductById);
router.route('/update').post(configStorage('/image/product').array('images'), updateProduct);
router.route('/delete').post(deleteProduct);

export default router
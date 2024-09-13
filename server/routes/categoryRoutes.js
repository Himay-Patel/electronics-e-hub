import express from 'express'
import { getAllCategories, addCategori, getCategoriById, updateCategori, deleteCategori } from '../controllers/categotyController.js';
import configStorage from '../config/multer.js';

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/add').post(configStorage('/image/category').array('imageUrl'), addCategori);
router.route('/:_id').get(getCategoriById);
router.route('/update').post(configStorage('/image/category').array('imageUrl'), updateCategori);
router.route('/delete').post(deleteCategori);

export default router
import express from 'express'
import { getAllCategories } from '../controllers/categotyController.js';

const router = express.Router();

router.route('/').get(getAllCategories);

export default router
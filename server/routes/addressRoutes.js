import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { allAddress, createAddress, getAddressesByUserId, userAddresses } from '../controllers/addressContorller.js';

const router = express.Router();

router.route('/').get(allAddress);
router.route('/user=:userId').get(getAddressesByUserId);
router.route('/:userId').get(authMiddleware, userAddresses);
router.route('/create').post(authMiddleware, createAddress);

export default router;
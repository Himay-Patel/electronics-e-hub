import express from 'express'
import { getAllUsers, deleteUser, getUserById, initiateResetPassword, login, logout, register, resetPassword, totalUser, userUpdateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import configStorage from '../config/multer.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/delete').post(deleteUser);
router.route('/totaluser').get(totalUser);
router.route('/:_id').get(getUserById);
router.route('/register').post(register);
router.route('/login').post(login)
router.route('/logout').post(logout);
router.route('/password/reset').post(authMiddleware, resetPassword);
router.route('/password/reset/initiate').post(initiateResetPassword);
router.route('/updateprofile').post(configStorage('/image/userProfile').single('image'), userUpdateProfile);

export default router;
import express from 'express'
import { initiateResetPassword, login, logout, register, resetPassword } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/logout').post(logout);
router.route('/password/reset').post(authMiddleware, resetPassword);
router.route('/password/reset/initiate').post(initiateResetPassword);

export default router;
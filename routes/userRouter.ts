import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import {
	login,
	signup,
	protect,
	restrictTo,
	forgotPassword,
	resetPassword,
} from './../controllers/authController';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/forgotPassword').post(forgotPassword);
userRouter.route('/resetPassword').post(resetPassword);

userRouter.route('/').get(protect, restrictTo('user'), getAllUsers);

export default userRouter;

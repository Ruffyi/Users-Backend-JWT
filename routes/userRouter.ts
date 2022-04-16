import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import {
	login,
	signup,
	protect,
	restrictTo,
} from './../controllers/authController';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);

userRouter.route('/').get(protect, restrictTo('user'), getAllUsers);

export default userRouter;

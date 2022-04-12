import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { login, signup, protect } from './../controllers/authController';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);

userRouter.route('/').get(protect, getAllUsers);

export default userRouter;

import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';

const userRouter = Router();

userRouter.route('/').get(getAllUsers);

export default userRouter;

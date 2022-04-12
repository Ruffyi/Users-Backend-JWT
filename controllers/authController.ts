import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from './../model/userModel';

const signup = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, photo, password, passwordConfirm } = req.body;
		const newUser = await User.create({
			name,
			email,
			photo,
			password,
			passwordConfirm,
		});

		res.status(201).send({
			status: 'success',
			data: {
				newUser,
			},
		});
	}
);

export { signup };

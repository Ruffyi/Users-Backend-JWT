import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from './../model/userModel';

import dotenv from 'dotenv';
import CustomError from './../utils/CustomError';

dotenv.config();

const signToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

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

		const token = signToken(newUser._id);

		res.status(201).send({
			status: 'success',
			data: {
				newUser,
			},
			token,
		});
	}
);

const login = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { password, email } = req.body;

		if (!password || !email) {
			return next(new CustomError('You must specify email and password', 400));
		}

		const user = await User.findOne({ email }).select('+password');

		console.log(user.password);

		console.log(await user.comparePassword(password, user.password));

		if (!user || !(await user.comparePassword(password, user.password))) {
			return next(new CustomError('Incorrect email or password', 400));
		}

		const token = signToken(user._id);

		res.status(200).send({
			status: 'success',
			token,
		});
	}
);

export { signup, login };

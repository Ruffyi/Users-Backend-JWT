import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from './../model/userModel';
import sendMail from './../utils/email';

import dotenv from 'dotenv';
import CustomError from './../utils/CustomError';

dotenv.config();

interface IToken {
	id: string;
	iat: number;
	exp: number;
}

const signToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

const signup = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, photo, password, passwordConfirm, passwordChangedAt } =
			req.body;
		const newUser = await User.create({
			name,
			email,
			photo,
			password,
			passwordConfirm,
			passwordChangedAt,
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

const protect = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;
		let token;
		if (authorization && authorization.startsWith('Bearer')) {
			token = authorization.split(' ')[1];
		}

		if (!token) {
			return next(new CustomError('Incorrect token', 401));
		}

		const verifyToken = jwt.verify(token, process.env.JWT_SECRET) as IToken;

		if (!verifyToken) {
			return next(new CustomError('Invalid token', 401));
		}

		const freshUser = await User.findById(verifyToken.id);

		if (!freshUser) {
			return next(new CustomError('User not still exist in database', 400));
		}

		if (await freshUser.changedPasswordAt(verifyToken.iat)) {
			return next(new CustomError('User recently changed password!', 401));
		}

		req.user = freshUser;

		next();
	}
);

const restrictTo = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			return next(new CustomError('User not have a persist', 401));
		}
		next();
	};
};

const forgotPassword = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return next(new CustomError('User not exist', 404));
		}

		const resetToken = await user.createPasswordToken();

		await user.save({ validateBeforeSave: false });

		const resetUrl = `${req.protocol}://${req.get(
			'host'
		)}/api/v1/users/resetPassword/${resetToken}`;
		const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to: ${resetUrl}. If you didn't forget your password, ignore this email!`;

		try {
			await sendMail({
				email: user.email,
				subject: 'Your password reset token',
				message,
			});
			res.status(200).send({
				status: 'success',
				message: 'Token send to email!',
			});
		} catch (err) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });
			return next(
				new CustomError(
					'There was an error sending an email. Try again later!',
					400
				)
			);
		}
	}
);

const resetPassword = (req: Request, res: Response, next: NextFunction) => {};

export { signup, login, protect, restrictTo, forgotPassword, resetPassword };

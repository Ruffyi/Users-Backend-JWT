import { Request, Response, NextFunction } from 'express';
import CustomError from './../utils/CustomError';

import dotenv from 'dotenv';

dotenv.config();

const sendErrorProd = (err: CustomError, res: Response) => {
	const {
		httpStatus = 500,
		message,
		responseStatus = 'error',
		isOperational,
	} = err;

	if (!isOperational) {
		res.send({
			message: 'Something does wrong',
		});
	}

	res.send({
		error: {
			message,
			httpStatus,
			responseStatus,
		},
	});
};

const sendErrorDev = (err: CustomError, res: Response) => {
	const { httpStatus = 500, message, responseStatus = 'error' } = err;
	res.send({
		error: {
			message,
			httpStatus,
			responseStatus,
		},
		stack: err.stack,
	});
};

const globalErrorMiddleware = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (process.env.PROJECT_MODE === 'production') {
		sendErrorProd(err, res);
	}
	if (process.env.PROJECT_MODE === 'development') {
		sendErrorDev(err, res);
	}
};

export default globalErrorMiddleware;

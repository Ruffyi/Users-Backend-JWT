import express, { Application, Request, Response, NextFunction } from 'express';
import connectToMongoDB from './db/connectDB';

import userRouter from './routes/userRouter';
import globalErrorMiddleware from './controllers/errorController';

import CustomError from './utils/CustomError';

import dotenv from 'dotenv';

dotenv.config();

connectToMongoDB();

const app: Application = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT || 5000;

app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	next(new CustomError(`Server don't handle a ${req.originalUrl} url`, 404));
});

app.use(globalErrorMiddleware);

app.listen(PORT, () => {
	console.log(`Server is listening at port : ${PORT}`);
});

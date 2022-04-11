import express, { Application } from 'express';
import connectToMongoDB from './db/connectDB';

import userRouter from './routes/userRouter';

import dotenv from 'dotenv';

dotenv.config();

connectToMongoDB();

const app: Application = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT || 5000;

app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
	console.log(`Server is listening at port : ${PORT}`);
});

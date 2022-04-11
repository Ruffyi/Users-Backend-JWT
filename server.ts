import express, { Application } from 'express';
import connectToMongoDB from './db/connectDB';
import dotenv from 'dotenv';

dotenv.config();

connectToMongoDB();

const app: Application = express();

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is listening at port : ${PORT}`);
});

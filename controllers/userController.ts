import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import User from './../model/userModel';

const getAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
	const allUsers = await User.find({});

	res.send({
		status: 'success',
		data: {
			allUsers,
		},
	});
});

export { getAllUsers };

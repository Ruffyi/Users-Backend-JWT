import { Request, Response } from 'express';

import User from './../model/userModel';

const getAllUsers = async (req: Request, res: Response) => {
	const allUsers = await User.find({});

	res.send({
		status: 'success',
		data: {
			allUsers,
		},
	});
};

export { getAllUsers };

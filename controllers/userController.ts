import { Request, Response } from 'express';

const getAllUsers = (req: Request, res: Response) => {
	res.send({
		message: 'All users',
	});
};

export { getAllUsers };

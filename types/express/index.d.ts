import IUserModel from './../../model/userModel.types';

declare global {
	namespace Express {
		interface Request {
			user: IUserModel;
		}
	}
}

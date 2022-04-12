import { Document } from 'mongoose';

interface IUserModel extends Document {
	name: string;
	email: string;
	photo?: string;
	password: string;
	passwordConfirm: string;
}

export default IUserModel;

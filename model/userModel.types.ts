import { Document } from 'mongoose';

interface IUserModel extends Document {
	name: string;
}

export default IUserModel;

import { Model, model, Schema } from 'mongoose';

import IUserModel from './userModel.types';

const userSchema = new Schema<IUserModel>({
	name: {
		type: String,
	},
});

const User: Model<IUserModel> = model('User', userSchema);

export default User;

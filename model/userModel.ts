import { Model, model, Schema } from 'mongoose';
import validator from 'validator';

import IUserModel from './userModel.types';

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name!'],
	},
	email: {
		type: String,
		required: [true, 'Please provide a email!'],
		validate: [validator.isEmail, 'Please provide a valid email!'],
		unique: true,
		lowercase: true,
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password!'],
		trim: true,
		minlength: 8,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm a password!'],
	},
});

const User: Model<IUserModel> = model('User', userSchema);

export default User;

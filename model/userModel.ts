import { Model, model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
		validate: {
			validator: function (this: IUserModel, value: string) {
				return this.password === value;
			},
			message: 'Passwords are not the same!',
		},
	},
});

userSchema.pre<IUserModel>('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string,
	userPassword: string
) {
	return bcrypt.compare(candidatePassword, userPassword);
};

const User: Model<IUserModel> = model('User', userSchema);

export default User;

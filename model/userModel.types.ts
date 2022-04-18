import { Document } from 'mongoose';

interface IUserModelMethods {
	comparePassword: (candidatePassword: string, userPassword: string) => boolean;
	changedPasswordAt: (JWTTimestamp: number) => boolean;
	createPasswordToken: () => string;
}

interface IUserModel extends Document, IUserModelMethods {
	name: string;
	email: string;
	photo?: string;
	password: string;
	passwordConfirm: string | undefined;
	passwordChangedAt?: Date | undefined;
	passwordResetToken?: string | undefined;
	passwordResetExpires: Date;
	role?: string;
}

export default IUserModel;

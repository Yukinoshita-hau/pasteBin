import mongoose from 'mongoose';
import { IUserSchema } from './user.ischema';

const Schema = mongoose.Schema;

const userSchema = new Schema<IUserSchema>({
	id: {
		type: String,
	},

	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export const UserSchema = mongoose.model<IUserSchema>('user', userSchema);

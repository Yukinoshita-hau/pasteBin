import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

export const UserSchema = mongoose.model('user', userSchema);

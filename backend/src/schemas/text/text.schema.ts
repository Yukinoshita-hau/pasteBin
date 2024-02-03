import mongoose from 'mongoose';

const Schema: typeof mongoose.Schema = mongoose.Schema;

const textSchema = new Schema({
	text: {
		type: String,
		require: true,
	},
});

export const TextSchema = mongoose.model('text', textSchema);

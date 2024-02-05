import mongoose from 'mongoose';
import { ITextSchema } from './text.Ischema';

const Schema: typeof mongoose.Schema = mongoose.Schema;

const textSchema = new Schema<ITextSchema>({
	id: {
		type: String,
	},

	text: {
		type: String,
		require: true,
	},
});

export const TextSchema = mongoose.model<ITextSchema>('text', textSchema);

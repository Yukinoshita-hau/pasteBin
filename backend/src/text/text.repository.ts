import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MongooseServise } from '../database/mongoose.servise';
import { TextSchema } from '../schemas/text/text.schema';
import { IUserRepository } from '../user/user-interfaces/user.irepository';
import { ITextRepository } from './text-interfaces/text.irepository';
import { TextCreateDto } from './dto/create.text.dto';

@injectable()
export class TextRepository implements ITextRepository {
	constructor(@inject(TYPES.MongooseServise) private mongooseService: MongooseServise) {}

	public async create({ text }: TextCreateDto): Promise<any> {
		const newText = new TextSchema({ text: text });
		return await newText.save();
	}

	public async find(id: string): Promise<any | null> {
		return TextSchema.findById(id);
	}
}

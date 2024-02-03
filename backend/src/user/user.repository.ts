import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MongooseServise } from '../database/mongoose.servise';
import { TextSchema } from '../schemas/text/text.schema';
import { LoggerInterface } from '../logger/logger.interface';
import { UserCreateDto } from './dto/user-create';
import { IUserRepository } from './user-interfaces/irepository';
import { UserSchema } from '../schemas/user/user.schema';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@inject(TYPES.MongooseServise) private mongooseServise: MongooseServise,
		@inject(TYPES.LoggerService) private logger: LoggerInterface,
	) {}

	async create(user: UserCreateDto): Promise<void> {
		try {
			const newUser = new UserSchema(user);
			await newUser.save();
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error(err.message);
			}
		}
	}
}

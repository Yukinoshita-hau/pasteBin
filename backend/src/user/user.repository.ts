import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MongooseServise } from '../database/mongoose.servise';
import { TextSchema } from '../schemas/text/text.schema';
import { LoggerInterface } from '../logger/logger.interface';
import { UserRegiseterDto } from './dto/user-register';
import { UserSchema } from '../schemas/user/user.schema';
import mongoose, { Model, Schema } from 'mongoose';
import { IUserRepository } from './user-interfaces/irepository';
import { User } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@inject(TYPES.MongooseServise) private mongooseServise: MongooseServise,
		@inject(TYPES.LoggerService) private logger: LoggerInterface,
	) {}

	public async create(user: User): Promise<any> {
		console.log(user, '1');
		const newUser = new UserSchema({
			name: user.name,
			email: user.email,
			password: user.password,
		});
		return await newUser.save();
	}

	public async find(email: string): Promise<any | null> {
		return UserSchema.findOne({ email });
	}
}

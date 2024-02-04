import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MongooseServise } from '../database/mongoose.servise';
import { UserSchema } from '../schemas/user/user.schema';
import { IUserRepository } from './user-interfaces/user.irepository';
import { User } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.MongooseServise) private mongooseServise: MongooseServise) {}

	public async create(user: User): Promise<any> {
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

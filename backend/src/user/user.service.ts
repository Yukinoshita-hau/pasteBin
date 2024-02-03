import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create';
import { IUserService } from './user-interfaces/iservice';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

	async createUser(user: UserCreateDto): Promise<void> {
		await this.userRepository.create(user);
	}
}

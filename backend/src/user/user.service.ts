import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { UserRepository } from './user.repository';
import { UserRegiseterDto } from './dto/user-register';
import { UserLoginDto } from './dto/user-login';
import { User } from './user.entity';
import { IConfigService } from '../config/Iconfig-service';
import { IUserService } from './user-interfaces/user.iservice';
import { IUserSchema } from '../schemas/user/user.ischema';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: UserRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	public async createUser({
		email,
		name,
		password,
	}: UserRegiseterDto): Promise<IUserSchema | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existendUser = await this.userRepository.find(email);
		if (existendUser) {
			return null;
		}
		return await this.userRepository.create(newUser);
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existendUser = await this.userRepository.find(email);
		if (!existendUser) {
			return false;
		}
		const newUser = new User(existendUser.name, existendUser.email, existendUser.password);
		return newUser.comparePassword(password);
	}

	public async getUserInfo(email: string): Promise<IUserSchema | null> {
		return this.userRepository.find(email);
	}
}

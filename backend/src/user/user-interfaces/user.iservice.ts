import { UserRegiseterDto } from '../dto/user-register';
import { UserLoginDto } from '../dto/user-login';
import { IUserSchema } from '../../schemas/user/user.ischema';

export interface IUserService {
	createUser: (dto: UserRegiseterDto) => Promise<IUserSchema | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<IUserSchema | null>;
}

import { UserRegiseterDto } from '../dto/user-register';
import { UserLoginDto } from '../dto/user-login';

export interface IUserService {
	createUser: (dto: UserRegiseterDto) => Promise<any | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<any | null>;
}

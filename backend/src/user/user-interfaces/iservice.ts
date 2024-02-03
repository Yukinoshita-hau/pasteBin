import { UserCreateDto } from '../dto/user-create';

export interface IUserService {
	createUser: (user: UserCreateDto) => Promise<void>;
}

import { UserCreateDto } from '../dto/user-create';

export interface IUserRepository {
	create: (text_value: UserCreateDto) => Promise<void>;
}

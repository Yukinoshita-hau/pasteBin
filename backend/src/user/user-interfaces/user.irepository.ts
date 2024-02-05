import { User } from '../user.entity';
import { IUserSchema } from '../../schemas/user/user.ischema';

export interface IUserRepository {
	create: (user: User) => Promise<IUserSchema>;
	find: (email: string) => Promise<IUserSchema | null>;
}

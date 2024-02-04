import { Model } from 'mongoose';
import { UserRegiseterDto } from '../dto/user-register';
import { User } from '../user.entity';

export interface IUserRepository {
	create: (user: User) => Promise<any>;
	find: (email: string) => Promise<any | null>;
}

import { IsEmail, IsString } from 'class-validator';

export class UserRegiseterDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString({ message: 'Это не строка' })
	password: string;
}

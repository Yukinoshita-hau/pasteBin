import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString({ message: 'Это не строка' })
	password: string;
}

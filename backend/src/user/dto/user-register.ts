import { IsEmail, IsString } from 'class-validator';

export class UserRegiseterDto {
	@IsString({ message: 'Неверно указан name' })
	name: string;

	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'Неверно указан password' })
	password: string;
}

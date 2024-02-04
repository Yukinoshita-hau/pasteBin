import { IsString } from 'class-validator';

export class TextCreateDto {
	@IsString({ message: 'Это не строка' })
	text: string;
}

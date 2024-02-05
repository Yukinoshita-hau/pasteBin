import { IsString } from 'class-validator';

export class TextCreateDto {
	@IsString({ message: 'Неверно указан text' })
	text: string;
}

import { IsString } from 'class-validator';

export class TextShowDto {
	@IsString({ message: 'Это не id' })
	id: string;
}

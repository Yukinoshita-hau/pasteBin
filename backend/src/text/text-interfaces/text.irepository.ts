import { TextCreateDto } from '../dto/create.text.dto';

export interface ITextRepository {
	create: (text: TextCreateDto) => Promise<any>;
	find: (id: string) => Promise<any | null>;
}

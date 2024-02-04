import { TextCreateDto } from '../dto/create.text.dto';

export interface ITextService {
	createText: (text: TextCreateDto) => Promise<any>;
	getText: (id: string) => Promise<any>;
}

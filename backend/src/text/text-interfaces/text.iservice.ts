import { ITextSchema } from '../../schemas/text/text.Ischema';
import { TextCreateDto } from '../dto/create.text.dto';

export interface ITextService {
	createText: (text: TextCreateDto) => Promise<ITextSchema>;
	getText: (id: string) => Promise<ITextSchema | null>;
}

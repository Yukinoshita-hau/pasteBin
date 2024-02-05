import { ITextSchema } from '../../schemas/text/text.Ischema';
import { TextCreateDto } from '../dto/create.text.dto';

export interface ITextRepository {
	create: (text: TextCreateDto) => Promise<ITextSchema>;
	find: (id: string) => Promise<ITextSchema | null>;
}

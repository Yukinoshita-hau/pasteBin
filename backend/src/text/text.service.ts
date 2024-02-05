import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/Iconfig-service';
import { TextCreateDto } from './dto/create.text.dto';
import { ITextRepository } from './text-interfaces/text.irepository';
import { ITextService } from './text-interfaces/text.iservice';
import { ITextSchema } from '../schemas/text/text.Ischema';

@injectable()
export class TextService implements ITextService {
	constructor(
		@inject(TYPES.TextRepository) private textRepository: ITextRepository,
		@inject(TYPES.ConfigService) configSevice: IConfigService,
	) {}

	public async createText(req: TextCreateDto): Promise<ITextSchema> {
		return await this.textRepository.create(req);
	}

	public async getText(id: string): Promise<ITextSchema | null> {
		return this.textRepository.find(id);
	}
}

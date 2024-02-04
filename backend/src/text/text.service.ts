import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/Iconfig-service';
import { TextCreateDto } from './dto/create.text.dto';
import { TextSchema } from '../schemas/text/text.schema';
import { ITextRepository } from './text-interfaces/text.irepository';
import { ITextService } from './text-interfaces/text.iservice';

@injectable()
export class TextService implements ITextService {
	constructor(
		@inject(TYPES.TextRepository) private textRepository: ITextRepository,
		@inject(TYPES.ConfigService) configSevice: IConfigService,
	) {}

	public async createText(req: TextCreateDto): Promise<any> {
		return await this.textRepository.create(req);
	}

	public async getText(id: string): Promise<any> {
		return this.textRepository.find(id);
	}
}

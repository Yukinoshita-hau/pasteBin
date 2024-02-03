import { inject, injectable } from 'inversify';
import { IConfigService } from './Iconfig-service';
import { TYPES } from '../types';
import { LoggerInterface } from '../logger/logger.interface';
import 'reflect-metadata';
import { DotenvConfigOutput, DotenvParseOutput, config, parse } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerService) private logger: LoggerInterface) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] Ошибка чтения .env файлов или же их отсутствие');
		} else {
			this.logger.log('[ConfigService] Конфигурации .env были успрешно Загружены');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}

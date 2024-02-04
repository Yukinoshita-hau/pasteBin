import { inject, injectable } from 'inversify';
import { IConfigService } from './Iconfig-service';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/ilogger';
import 'reflect-metadata';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] Ошибка чтения .env файлов или же их отсутствие');
		} else {
			this.logger.log('[ConfigService] Конфигурации .env были успешно Загружены');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	public get(key: string): string {
		return this.config[key];
	}
}

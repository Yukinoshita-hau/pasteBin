import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerInterface } from '../logger/logger.interface';
import mongoose, { Mongoose } from 'mongoose';
import { IConfigService } from '../config/Iconfig-service';

@injectable()
export class MongooseServise implements DataBaseInterface {
	private client: Mongoose;
	private URL: string;

	constructor(
		@inject(TYPES.LoggerService) private logger: LoggerInterface,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		(this.URL =
			'mongodb+srv://' +
			this.configService.get('LOGIN') +
			':' +
			this.configService.get('PASSWORD') +
			'@' +
			this.configService.get('DATABASE') +
			'.wedoqla.mongodb.net/' +
			this.configService.get('REPOSITORY') +
			'?retryWrites=true&w=majority'),
			(this.client = mongoose);
	}

	public async connect(): Promise<void> {
		try {
			await this.client.connect(this.URL);
			this.logger.log('[mongooseServise] Connect to DB');
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error(`[mongooseServise] DB connect error: ${err.message}`);
			}
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.disconnect();
	}
}

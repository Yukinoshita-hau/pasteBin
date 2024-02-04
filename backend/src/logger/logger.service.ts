import { ILogObj, Logger } from 'tslog';
import { ILoggerService } from './ilogger';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILoggerService {
	public logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({
			type: 'pretty',
		});
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}

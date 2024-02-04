import { NextFunction, Request, Response } from 'express';
import { httpError } from './http.error';
import { ILoggerService } from '../../logger/ilogger';
import { IExeptionFilter } from './exeption.filter.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../types';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.LoggerService) public logger: ILoggerService) {}

	public catch(error: httpError | Error, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof httpError) {
			this.logger.error(`[${error.context}]: ${error.statusCode} - ${error.message}`);
			res.status(error.statusCode).json({ message: error.message });
		} else {
			this.logger.error(`${error.message}`);
			res.status(500).json({ message: error.message });
		}
	}
}

import { Request, Response, NextFunction } from 'express';
import { httpError } from './http.error';

export interface IExeptionFilter {
	catch(error: httpError | Error, req: Request, res: Response, next: NextFunction): void;
}

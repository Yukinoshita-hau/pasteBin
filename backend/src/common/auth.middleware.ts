import { NextFunction, Request, Response } from 'express';
import { IMiddleWare } from './imiddleware';
import { verify } from 'jsonwebtoken';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/Iconfig-service';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (typeof payload !== 'string' && typeof payload !== 'undefined') {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}

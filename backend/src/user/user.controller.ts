import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { httpError } from '../common/error/http.error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerInterface } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserService } from './user-interfaces/iservice';
import { IUserController } from './user-interfaces/icontroller';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/Iconfig-service';
import { ValidatorMiddleware } from '../common/validator.middleware';
import { UserCreateDto } from './dto/user-create';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: LoggerInterface,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'get', func: this.login },
			{ path: '/register', method: 'get', func: this.register },
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new ValidatorMiddleware(UserCreateDto)],
			},
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.loggerService.log(this.configService.get('SALT'));
		next(new httpError(500, 'Avtoriseting Error', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		res.status(200).json({ data: ['data', 'ress', 'wer'] });
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		this.userService.createUser(body);
		res.status(200).send('ok').end();
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((res, rej) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						rej(err);
					}
					res(token as string);
				},
			);
		});
	}
}

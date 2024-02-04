import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { httpError } from '../common/error/http.error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/ilogger';
import { IUserService } from './user-interfaces/user.iservice';
import { IUserController } from './user-interfaces/user.icontroller';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/Iconfig-service';
import { ValidatorMiddleware } from '../common/validator.middleware';
import { UserRegiseterDto } from './dto/user-register';
import { UserLoginDto } from './dto/user-login';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidatorMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidatorMiddleware(UserRegiseterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	public async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (result) {
			const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
			this.ok(res, { jwt });
		} else {
			return next(new httpError(500, 'Неволидные данные', 'login'));
		}
	}

	public async register({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new httpError(409, 'Пользователь уже существует', 'register'));
		}
		res.status(201).json({ email: result.email, id: result.id });
	}

	public async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { name: userInfo.name, email: userInfo.email, id: userInfo.id });
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

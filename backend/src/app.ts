import express, { Express, Router } from 'express';
import { Server } from 'node:http';
import { ILoggerService } from './logger/ilogger';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IExeptionFilter } from './common/error/exeption.filter.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import cors from 'cors';
import { MongooseServise } from './database/mongoose.servise';
import { UserController } from './user/user.controller';
import { IConfigService } from './config/Iconfig-service';
import { AuthMiddleware } from './common/auth.middleware';
import { TextController } from './text/text.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.TextController) private TextController: TextController,
		@inject(TYPES.LoggerService) private logger: ILoggerService,
		@inject(TYPES.ExeptionFilterService) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.MongooseServise) private mongooseServise: MongooseServise,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public useRoutes(): void {
		this.app.use('/', this.userController.router);
		this.app.use('/text', this.TextController.router);
	}

	public useMiddware(): void {
		this.app.use(json());
		this.app.use(cors());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	public useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddware();
		this.useRoutes();
		this.useExeptionFilter();
		await this.mongooseServise.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started on port ${this.port}`);
	}
}

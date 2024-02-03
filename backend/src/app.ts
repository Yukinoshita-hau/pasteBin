import express, { Express, Router } from 'express';
import { Server } from 'node:http';
import { LoggerInterface } from './logger/logger.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { IExeptionFilter } from './common/error/exeption.filter.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import cors from 'cors';
import { MongooseServise } from './database/mongoose.servise';
import { UserController } from './user/user.controller';
import { IConfigService } from './config/Iconfig-service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.LoggerService) private logger: LoggerInterface,
		@inject(TYPES.ExeptionFilterService) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.MongooseServise) private mongooseServise: MongooseServise,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public useRoutes(path: string, handlers: Router): void {
		this.app.use(path, handlers);
	}

	public useMiddware(): void {
		this.app.use(json());
		this.app.use(cors());
	}

	public useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddware();
		this.useRoutes('/', this.userController.router);
		this.useExeptionFilter();
		await this.mongooseServise.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started on port ${this.port}`);
	}
}

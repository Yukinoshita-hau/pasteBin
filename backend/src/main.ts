import { Container } from 'inversify';
import { LoggerInterface } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './user/user.controller';
import { IExeptionFilter } from './common/error/exeption.filter.interface';
import { ExeptionFilter } from './common/error/exeption.filter';
import { App } from './app';
import { MongooseServise } from './database/mongoose.servise';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';
import { IUserController } from './user/user-interfaces/icontroller';
import { IUserRepository } from './user/user-interfaces/irepository';
import { IUserService } from './user/user-interfaces/iservice';
import { IConfigService } from './config/Iconfig-service';
import { ConfigService } from './config/config.service';

const appContainer = new Container();
appContainer.bind<LoggerInterface>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
appContainer.bind<IUserController>(TYPES.UserController).to(UserController);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilterService).to(ExeptionFilter);
appContainer.bind<MongooseServise>(TYPES.MongooseServise).to(MongooseServise).inSingletonScope();
appContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
appContainer.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };

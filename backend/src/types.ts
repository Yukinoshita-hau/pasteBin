import 'reflect-metadata';

export const TYPES = {
	UserController: Symbol.for('UserController'),
	LoggerService: Symbol.for('LoggerService'),
	ExeptionFilterService: Symbol.for('ExeptionFilterService'),
	MongooseServise: Symbol.for('MongooseServise'),
	UserRepository: Symbol.for('UserRepository'),
	UserService: Symbol.for('UserService'),
	ConfigService: Symbol.for('ConfigService'),
	Application: Symbol.for('Application'),
};

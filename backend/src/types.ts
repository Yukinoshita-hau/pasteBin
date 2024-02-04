import 'reflect-metadata';

export const TYPES = {
	UserController: Symbol.for('UserController'),
	TextController: Symbol.for('TextController'),
	LoggerService: Symbol.for('LoggerService'),
	ExeptionFilterService: Symbol.for('ExeptionFilterService'),
	MongooseServise: Symbol.for('MongooseServise'),
	UserRepository: Symbol.for('UserRepository'),
	TextRepository: Symbol.for('TextRepository'),
	UserService: Symbol.for('UserService'),
	TextService: Symbol.for('TextService'),
	ConfigService: Symbol.for('ConfigService'),
	Application: Symbol.for('Application'),
};

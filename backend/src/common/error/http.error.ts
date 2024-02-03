export class httpError extends Error {
	statusCode: number;
	context?: string;

	constructor(statusCode: number, message: string);
	constructor(statusCode: number, message: string, context: string);
	constructor(statusCode: number, message: string, context: string = 'Не задан') {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.context = context;
	}
}

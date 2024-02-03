import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './imiddleware';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidatorMiddleware implements IMiddleWare {
	constructor(private classToValidate: ClassConstructor<object>) {}
	exexcute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}

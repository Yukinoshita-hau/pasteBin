import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IConfigService } from '../config/Iconfig-service';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/ilogger';
import { ITextController } from './text-interfaces/text.icontroller';
import { Request, Response, NextFunction } from 'express';
import { TextCreateDto } from './dto/create.text.dto';
import { TextService } from './text.service';
import { TextShowDto } from './dto/show.text.dto';
import { ValidatorMiddleware } from '../common/validator.middleware';
import { AuthGuard } from '../common/auth.guard';
import { httpError } from '../common/error/http.error';

@injectable()
export class TextController extends BaseController implements ITextController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TextService) private textService: TextService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new ValidatorMiddleware(TextCreateDto), new AuthGuard()],
			},
			{
				path: '/show',
				method: 'post',
				func: this.show,
				middlewares: [new ValidatorMiddleware(TextShowDto), new AuthGuard()],
			},
		]);
	}

	public async create(
		{ body }: Request<{}, {}, TextCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.textService.createText(body);
		res.status(201).json({ id: result.id, text: result.text });
	}

	public async show(
		{ body }: Request<{}, {}, TextShowDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const text = await this.textService.getText(body.id);
		if (!text) {
			throw new httpError(400, 'Текст не найден', 'show');
		}
		this.ok(res, text.text);
	}
}

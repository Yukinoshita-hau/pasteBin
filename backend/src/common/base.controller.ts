import { Response, Router } from 'express';
import { IControllerRoute, ExpressReturnType } from './route.interface';
import { ILoggerService } from '../logger/ilogger';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public ok(res: Response, message: any): ExpressReturnType {
		res.type('application/json');
		res.json({ status: 'ok', message: message });
		return res.status(200).end();
	}

	public error(res: Response): ExpressReturnType {
		this.logger.error('Ошибка');
		return res.json({ error: '500' });
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`${route.method}: ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipline);
		}
	}
}

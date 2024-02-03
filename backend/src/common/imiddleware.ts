import { NextFunction, Request, Response } from 'express';

export interface IMiddleWare {
	exexcute: (req: Request, res: Response, next: NextFunction) => void;
}

import { Request, NextFunction, Response } from 'express';

export interface ITextController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	show: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

import { NextFunction, Request, Response } from 'express';

export const logRequest = (req: Request, _: Response, next: NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`);
    next();
};

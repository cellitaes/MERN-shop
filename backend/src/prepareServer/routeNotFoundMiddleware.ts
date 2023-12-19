import { Express } from 'express';

import HttpError from '../models/http-error';

export const routeNotFoundMiddleware = (app: Express) => {
    app.use((_, _2, _3) => {
        const error = new HttpError('Could not find this route.', 404);
        throw error;
    });
};

import { Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../../../models/http-error';

export const throwErrorWhenValidationFailed = (
    req: Request,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
};

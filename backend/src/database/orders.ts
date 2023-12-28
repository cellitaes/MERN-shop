import { NextFunction } from 'express';

import HttpError from '../models/http-error';

export const postOrder = async (next: NextFunction, newOrder: any) => {
    try {
        return await newOrder.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not save order',
            500
        );
        return next(error);
    }
};

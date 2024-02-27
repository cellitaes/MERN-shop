import { Request, Response, NextFunction } from 'express';

import HttpError from '../../models/http-error';

import { getCategories } from '../../database/categories';

export const getAllCategories = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    let categories;

    try {
        categories = await getCategories();
    } catch (err) {
        return next(err);
    }

    if (!categories) {
        const error = new HttpError(
            'Something went wrong, could not fetch categories.',
            404
        );
        return next(error);
    }

    res.status(200).json({ categories });
};

import { Request, Response, NextFunction } from 'express';
import HttpError from '../../models/http-error';
import Category from '../../models/category';

export const getCategories = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    let categories;

    try {
        categories = await Category.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch categories.',
            500
        );
        return next(error);
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

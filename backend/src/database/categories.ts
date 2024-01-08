import { NextFunction } from 'express';

import Category from '../models/category';
import HttpError from '../models/http-error';

export const getCategoryByName = async (
    next: NextFunction,
    categoryName: string
) => {
    try {
        return await Category.findOne({ name: categoryName });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch categories.',
            500
        );
        return next(error);
    }
};

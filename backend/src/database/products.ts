import { NextFunction } from 'express';

import HttpError from '../models/http-error';
import Product from '../models/product';

export const getProductsByCategory = async (
    next: NextFunction,
    category: any,
    page: number,
    pageSize: number
) => {
    try {
        return await Product.find(category)
            .skip(page * pageSize)
            .limit(pageSize)
            .populate('category');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch products.',
            500
        );
        return next(error);
    }
};

export const getProductsCount = async (
    next: NextFunction,
    condition: any = {}
) => {
    try {
        return await Product.count(condition);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch products.',
            500
        );
        return next(error);
    }
};

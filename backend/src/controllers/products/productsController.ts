import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import HttpError from '../../models/http-error';

import {
    getProductsByCategory,
    getProductsCount,
} from '../../database/products';
import { getCategoryByName } from '../../database/categories';

export const getProductsFromShop = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const category = (req.query.category as string) || '';
    const pageSize = +req.query.pageSize!;
    const page = +req.query.page!;

    let categoryFilter = {};

    if (category.trim() !== '') {
        const foundCategory = await getCategoryByName(next, category);

        if (foundCategory) {
            categoryFilter = {
                category: new Types.ObjectId(foundCategory._id),
            };
        }
    }

    const products = await getProductsByCategory(
        next,
        categoryFilter,
        page,
        pageSize
    );
    const productsCount = await getProductsCount(next, categoryFilter);

    if (
        typeof products === 'undefined' ||
        typeof productsCount === 'undefined'
    ) {
        const error = new HttpError(
            'Something went wrong, could not fetch products.',
            404
        );
        return next(error);
    }

    res.status(200).json({ products, dataLength: productsCount });
};

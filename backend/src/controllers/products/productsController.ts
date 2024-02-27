import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import HttpError from '../../models/http-error';

import {
    deleteManyProducts,
    deleteProduct,
    getProductsByCategory,
    getProductsCount,
    postProduct,
    updateProduct,
} from '../../database/products';
import { getCategoryByName } from '../../database/categories';

export const getProductsFromShop = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const category = (req.query.category as string) || '';
    const skip = +req.query.skip!;
    const limit = +req.query.limit!;

    let categoryFilter = {};

    if (category.trim() !== '') {
        let foundCategory;
        try {
            foundCategory = await getCategoryByName(category);
        } catch (err) {
            return next(err);
        }

        if (foundCategory) {
            categoryFilter = {
                category: new Types.ObjectId(foundCategory._id),
            };
        }
    }

    let products, productsCount;

    try {
        products = await getProductsByCategory(categoryFilter, skip, limit);
        productsCount = await getProductsCount(categoryFilter);
    } catch (err) {
        return next(err);
    }

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

export const editProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { _id } = req.body;
    const updateValues = req.body;
    let category;

    delete updateValues._id;

    try {
        category = await getCategoryByName(updateValues.category);
    } catch (err) {
        next(err);
    }

    if (!category) {
        const error = new HttpError(
            'Something went wrong, releated category not Found.',
            404
        );
        return next(error);
    }

    updateValues.category = category?._id;

    try {
        await updateProduct(_id, updateValues);
    } catch (err) {
        next(err);
    }

    res.status(200).json({ updatedProduct: updateValues });
};

export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newProduct = req.body;
    let category;

    try {
        category = await getCategoryByName(newProduct.category);
    } catch (err) {
        next(err);
    }

    if (!category) {
        const error = new HttpError(
            'Something went wrong, releated category not Found.',
            404
        );
        return next(error);
    }

    newProduct.category = category?._id;

    let response;
    try {
        response = await postProduct(newProduct);
    } catch (err) {
        next(err);
    }

    res.status(200).json({ newProduct: response });
};

export const deleteSingleProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productId = req.params.id;

    try {
        await deleteProduct(productId);
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ productId });
};

export const deleteProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const deleteProductIds = req.body.selectedProductsToDelete;

    try {
        await deleteManyProducts(deleteProductIds);
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ deleteProductIds });
};

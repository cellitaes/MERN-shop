import { ProductWithCategoryName } from '../interfaces/product';
import HttpError from '../models/http-error';
import Product, { ProductDocument as ProductData } from '../models/product';

import { ObjectId } from 'mongodb';

export const getProductsByCategory = async (
    category: any,
    skip: number,
    limit: number
) => {
    try {
        return await Product.find(category)
            .skip(skip)
            .limit(limit)
            .populate('category');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch products.',
            500
        );
        throw error;
    }
};

export const getProductsCount = async (condition: any = {}) => {
    try {
        return await Product.count(condition);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch products.',
            500
        );
        throw error;
    }
};

export const updateProduct = async (
    _id: ObjectId,
    values: ProductWithCategoryName
) => {
    try {
        return await Product.updateOne({ _id }, { $set: values });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update product.',
            500
        );
        throw error;
    }
};

export const postProduct = async (productData: ProductData) => {
    try {
        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update product.',
            500
        );
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const objectIdToDelete = new ObjectId(id);

        return await Product.deleteOne({ _id: objectIdToDelete });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete product.',
            500
        );
        throw error;
    }
};

export const deleteManyProducts = async (ids: string[]) => {
    try {
        const objectIdsToDelete = ids.map((id) => new ObjectId(id));

        return await Product.deleteMany({ _id: { $in: objectIdsToDelete } });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete products.',
            500
        );
        throw error;
    }
};

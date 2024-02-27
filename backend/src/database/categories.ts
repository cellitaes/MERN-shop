import Category from '../models/category';
import HttpError from '../models/http-error';

export const getCategoryByName = async (categoryName: string) => {
    try {
        return await Category.findOne({ name: categoryName });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch category.',
            500
        );
        throw error;
    }
};

export const getCategories = async () => {
    try {
        return await Category.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not fetch categories.',
            500
        );
        throw error;
    }
};

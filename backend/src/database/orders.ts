import HttpError from '../models/http-error';

export const postOrder = async (newOrder: any) => {
    try {
        return await newOrder.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not save order',
            500
        );
        throw error;
    }
};

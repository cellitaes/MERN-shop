import { NextFunction } from 'express';

import HttpError from '../models/http-error';
import User, { UserDocument as UserData } from '../models/user';

export const getUser = async (next: NextFunction, email: string) => {
    try {
        return await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Could not get User.', 500);
        return next(error);
    }
};

export const postUser = async (next: NextFunction, userData: UserData) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }
};

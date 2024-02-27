import { Request, Response, NextFunction } from 'express';

import HttpError from '../../models/http-error';

import { getUser, postUser } from '../../database/users';

import { createToken } from '../../utils/functions/auth/token';
import {
    hashPassword,
    validatePassword,
} from '../../utils/functions/auth/passwordHasing';
import { throwErrorWhenValidationFailed } from '../../utils/functions/errors/validationError';

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    throwErrorWhenValidationFailed(req, next);

    const userData = req.body;
    let existingUser, createdUser, token;

    try {
        existingUser = await getUser(userData.email);
    } catch (err) {
        return next(err);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    try {
        userData.password = await hashPassword(userData.password);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    try {
        createdUser = await postUser(userData);
    } catch (err) {
        return next(err);
    }

    try {
        if (!createdUser) throw new Error();
        token = createToken(createdUser._id, createdUser.email);
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({
        email: createdUser.email,
        id: createdUser._id,
        token,
    });
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userData = req.body;
    let existingUser,
        token,
        isValidPassword = false;

    try {
        existingUser = await getUser(userData.email);
    } catch (err) {
        return next(err);
    }

    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    try {
        isValidPassword = await validatePassword(
            userData.password,
            existingUser.password
        );
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    try {
        token = createToken(existingUser._id, existingUser.email);
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({
        userId: existingUser._id,
        email: existingUser.email,
        token: token,
        isAdmin: existingUser?.isAdmin ?? false,
    });
};

import { Request, Response, NextFunction } from 'express';

import HttpError from '../../models/http-error';
import { UserDocument as User } from '../../models/user';

import {
    deleteManyUsers,
    deleteUser,
    getUsers,
    updateUser,
} from '../../database/users';

export const getAllUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    let users: User[] = [];

    try {
        users = await getUsers();
    } catch (err) {
        return next(err);
    }

    if (!users) {
        const error = new HttpError(
            'Something went wrong, could not fetch users.',
            404
        );
        return next(error);
    }

    res.status(200).json({ users });
};

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { _id } = req.body;
    const updateValues = req.body;

    delete updateValues._id;

    try {
        await updateUser(_id, updateValues);
    } catch (err) {
        next(err);
    }

    res.status(200).json({ updatedUser: updateValues });
};

export const deleteSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.params.id;

    try {
        await deleteUser(userId);
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ userId });
};

export const deleteUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const deleteUserIds = req.body.selectedProductsToDelete;

    try {
        await deleteManyUsers(deleteUserIds);
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ deleteUserIds });
};

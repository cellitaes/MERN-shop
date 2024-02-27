import { ObjectId } from 'mongoose';
import User, { UserDocument as UserData } from '../models/user';

import HttpError from '../models/http-error';
import { ObjectId as MongoObjectId } from 'mongodb';

export const getUser = async (email: string) => {
    try {
        return await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Could not get User.', 500);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        return await User.find({}, '-password -isAdmin -__v');
    } catch (err) {
        const error = new HttpError('Could not get Users.', 500);
        throw error;
    }
};

export const updateUser = async (_id: ObjectId, values: UserData) => {
    try {
        return await User.updateOne({ _id }, { $set: values });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.',
            500
        );
        throw error;
    }
};

export const postUser = async (userData: UserData) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const objectIdToDelete = new MongoObjectId(id);

        return await User.deleteOne({ _id: objectIdToDelete });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete product.',
            500
        );
        throw error;
    }
};

export const deleteManyUsers = async (ids: string[]) => {
    try {
        const objectIdsToDelete = ids.map((id) => new MongoObjectId(id));

        return await User.deleteMany({ _id: { $in: objectIdsToDelete } });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete products.',
            500
        );
        throw error;
    }
};

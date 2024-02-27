import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { HASH_SALT } from '../../../config';

export const createToken = (userId: Types.ObjectId, email: string) => {
    return jwt.sign({ userId, email }, HASH_SALT, { expiresIn: '1h' });
};

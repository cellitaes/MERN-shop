import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import HttpError from '../../models/http-error';
import Order from '../../models/order';

import { postOrder } from '../../database/orders';

export const placeOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const newOrder = new Order(req.body);

    const response = await postOrder(next, newOrder);
    res.status(201).json({ status: 'ok', orderId: response._id });
};

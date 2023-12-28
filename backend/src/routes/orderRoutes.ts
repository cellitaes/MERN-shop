import express from 'express';
import { check } from 'express-validator';

import { placeOrder } from '../controllers/orders/orderController';

const router = express.Router();

router.post(
    '/place-order',
    [
        check('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Enter valid email.'),
        check('name').not().isEmpty().withMessage('Enter name'),
        check('surname').not().isEmpty().withMessage('Enter surname'),
        check('postalCode')
            .matches(/^\d{2}-\d{3}$/)
            .withMessage('Invalid postal code format. Should be XX-XXX'),
        check('city').not().isEmpty().withMessage('Enter city'),
        check('totalPrice').not().isEmpty(),
    ],
    placeOrder
);

export default router;

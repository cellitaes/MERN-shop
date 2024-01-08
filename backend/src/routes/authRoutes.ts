import express from 'express';
import { check } from 'express-validator';

import { loginUser, registerUser } from '../controllers/auth/authController';

const router = express.Router();

router.post(
    '/register',
    [
        check('email').normalizeEmail().isEmail(),
        check('password')
            .isLength({ min: 8 })
            .matches(/[a-z]/)
            .matches(/[A-Z]/)
            .matches(/\d/)
            .matches(/[!@#$%^&*(),.?":{}|<>]/),
        check('confirmPassword').custom((value: string, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
        check('name').isLength({ min: 2 }),
        check('surname').isLength({ min: 2 }),
    ],
    registerUser
);

router.post('/login', loginUser);

export default router;

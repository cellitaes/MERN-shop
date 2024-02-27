import express from 'express';
import { check } from 'express-validator';

import {
    deleteSingleUser,
    deleteUsers,
    editUser,
    getAllUsers,
} from '../controllers/users/usersController';

const router = express.Router();

router.get('/', getAllUsers);

router.patch(
    '/',
    [
        check('_id').not().isEmpty(),
        check('name')
            .isLength({ min: 2 })
            .withMessage('The value must be at least 5 characters long.'),
        check('surname')
            .isLength({ min: 2 })
            .withMessage('The value must be at least 5 characters long.'),
        check('email')
            .isEmail()
            .withMessage('The value must be a valid emial.'),
    ],
    editUser
);

router.delete('/:id', deleteSingleUser);

router.delete('/', deleteUsers);

export default router;

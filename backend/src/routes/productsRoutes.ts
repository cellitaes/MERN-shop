import express from 'express';
import {
    deleteProducts,
    deleteSingleProduct,
    getProductsFromShop,
    editProduct,
    addProduct,
} from '../controllers/products/productsController';
import { check } from 'express-validator';
import { isValidDecimal } from '../utils/functions/validation/routeValidation';

const router = express.Router();

router.get('/', getProductsFromShop);

router.patch(
    '/',
    [
        check('_id').not().isEmpty(),
        check('name')
            .isLength({ min: 5 })
            .withMessage('The value must be at least 5 characters long.'),
        check('price').custom((value) => {
            if (!isValidDecimal(value)) {
                throw new Error('Invalid decimal number');
            }
            return true;
        }),
        check('description')
            .isLength({ min: 10 })
            .withMessage('The value must be at least 10 characters long.'),
        check('category')
            .not()
            .isEmpty()
            .withMessage('Invalid postal code format. Should be XX-XXX'),
        check('image').not().isEmpty().withMessage('Image must be provided'),
    ],
    editProduct
);

router.post(
    '/',
    [
        check('name')
            .isLength({ min: 5 })
            .withMessage('The value must be at least 5 characters long.'),
        check('price').custom((value) => {
            if (!isValidDecimal(value)) {
                throw new Error('Invalid decimal number');
            }
            return true;
        }),
        check('description')
            .isLength({ min: 10 })
            .withMessage('The value must be at least 10 characters long.'),
        check('category')
            .not()
            .isEmpty()
            .withMessage('Invalid postal code format. Should be XX-XXX'),
        check('image').not().isEmpty().withMessage('Image must be provided'),
    ],
    addProduct
);

router.delete('/:id', deleteSingleProduct);

router.delete('/', deleteProducts);

export default router;

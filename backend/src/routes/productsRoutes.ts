import express from 'express';
import { getProductsFromShop } from '../controllers/products/productsController';

const router = express.Router();

router.get('/', getProductsFromShop);

export default router;

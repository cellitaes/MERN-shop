import express from 'express';
import { getCategories } from '../controllers/categories/categoriesController';

const router = express.Router();

router.get('/', getCategories);

export default router;

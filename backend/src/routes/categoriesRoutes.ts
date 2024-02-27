import express from 'express';

import { getAllCategories } from '../controllers/categories/categoriesController';

const router = express.Router();

router.get('/', getAllCategories);

export default router;

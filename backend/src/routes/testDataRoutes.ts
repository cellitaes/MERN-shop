import express from 'express';
import { seedDatabase } from '../database/utils/seedDatabase';

const router = express.Router();

router.post('/seed', seedDatabase);

export default router;

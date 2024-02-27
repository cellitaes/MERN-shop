import express from 'express';

import { getPicturesNames } from '../controllers/pictures/picturesController';

const router = express.Router();

router.get('/', getPicturesNames);

export default router;

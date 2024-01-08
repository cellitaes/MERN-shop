import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import { setCors } from './prepareServer/cors';
import { logRequest } from './prepareServer/logRequestMiddleware';
import { errorMiddleware } from './prepareServer/errorMiddleware';
import { routeNotFoundMiddleware } from './prepareServer/routeNotFoundMiddleware';

import productsRouter from './routes/productsRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import ordersRouter from './routes/orderRoutes';
import authRouter from './routes/authRoutes';

const app = express();

app.use(bodyParser.json());
app.use(
    '/uploads/images',
    express.static(path.join(__dirname, '../', 'uploads', 'images'))
);
app.use(logRequest);
app.use(setCors);

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', authRouter);

routeNotFoundMiddleware(app);
errorMiddleware(app);

mongoose
    .connect(`mongodb://mongodb:27017/test`)
    .then(() => {
        console.log('app is listening');
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });

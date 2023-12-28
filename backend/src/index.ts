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

routeNotFoundMiddleware(app);
errorMiddleware(app);

mongoose
    .connect(
        `mongodb+srv://shop:shop@shop.iilqcru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('app is listening');
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });

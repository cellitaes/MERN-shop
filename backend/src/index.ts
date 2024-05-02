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
import userRouter from './routes/userRoutes';
import picturesRouter from './routes/pictureRoutes';
import testDataRoutes from './routes/testDataRoutes';

const app = express();

app.use(bodyParser.json());
app.use(
    '/uploads/images',
    express.static(path.join(__dirname, '../', 'uploads', 'images'))
);
app.use(logRequest);
app.use(setCors);

app.use('/api/testData', testDataRoutes);

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/pictures', picturesRouter);

routeNotFoundMiddleware(app);
errorMiddleware(app);

mongoose
    // .connect(`mongodb://mongodb:27017/test`)
    .connect(`mongodb+srv://shop:shop@shop.iilqcru.mongodb.net/`)
    .then(() => {
        console.log('app is listening');
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });

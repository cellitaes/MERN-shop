import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { setCors } from './prepareServer/cors';
import { logRequest } from './prepareServer/logRequestMiddleware';
import { errorMiddleware } from './prepareServer/errorMiddleware';
import { routeNotFoundMiddleware } from './prepareServer/routeNotFoundMiddleware';

const app = express();

app.use(bodyParser.json());
app.use(logRequest);

setCors(app);
routeNotFoundMiddleware(app);
errorMiddleware(app);

mongoose
    .connect(
        `mongodb+srv://shop:<password>@shop.iilqcru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('app is listening');
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });

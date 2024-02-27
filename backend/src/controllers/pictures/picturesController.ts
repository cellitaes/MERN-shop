import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

import HttpError from '../../models/http-error';

const picturesFolder = path.join(
    __dirname,
    '../',
    '../',
    '../',
    'uploads',
    'images'
);

export const getPicturesNames = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    fs.readdir(picturesFolder, (err, files) => {
        if (err) {
            console.log(err);

            const error = new HttpError(
                'Something went wrong, could not fetch pictures.',
                404
            );
            return next(error);
        }

        const pictureNames = files.filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(ext);
        });

        res.status(200).json(pictureNames);
    });
};

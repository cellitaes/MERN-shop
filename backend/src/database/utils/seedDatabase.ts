import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import Category from '../../models/category';
import Product from '../../models/product';
import User from '../../models/user';

export const seedDatabase = async (_: Request, res: Response) => {
    let jsonData;

    try {
        const data = fs.readFileSync(
            path.join(__dirname, '../', 'seedData', 'seedData.json'),
            'utf8'
        );
        jsonData = JSON.parse(data);

        await Category.deleteMany({});
        await User.deleteMany({});
        await Product.deleteMany({});

        await Category.insertMany(jsonData.categories);
        await User.insertMany(jsonData.users);

        const allCategories: any[] = await Category.find({});

        const allCategoriesMap = allCategories.reduce((acc, curr) => {
            acc[curr._doc.name] = curr._doc._id;
            return acc;
        }, {});

        jsonData.products = jsonData.products.map((product: any) => ({
            ...product,
            category: allCategoriesMap[product.category],
        }));

        Product.insertMany(jsonData.products);
    } catch (error) {
        console.error('Error reading/parsing JSON file:', error);
    }

    return res.status(201).json({ hello: 'world', jsonData });
};

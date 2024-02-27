import { ObjectId } from 'mongoose';

export interface ProductWithCategoryName {
    name: string;
    description: string;
    price: number;
    image: string;
    category: ObjectId;
}

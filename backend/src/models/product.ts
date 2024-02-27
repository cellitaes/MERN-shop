import mongoose, { ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: ObjectId;
}

const productSchema = new Schema({
    name: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
});

export default mongoose.model<ProductDocument>('Product', productSchema);

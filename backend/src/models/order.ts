import mongoose from 'mongoose';
import { Decimal128 } from 'mongodb';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    totalPrice: { type: Decimal128, require: true },
});

export default mongoose.model('Order', orderSchema);

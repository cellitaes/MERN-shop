import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface ICategory extends mongoose.Document {
    name: string;
}

const categorySchema = new Schema({
    name: { type: String, required: true },
});

export default mongoose.model<ICategory>('Category', categorySchema);

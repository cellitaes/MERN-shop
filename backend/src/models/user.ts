import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
export interface UserDocument extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    isAdmin: { type: Boolean },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<UserDocument>('User', userSchema);

import mongoose, { HookNextFunction, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import ProductsSchema, { ProductSchemaTypes } from './Products';

interface UserSchemaType extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  products?: [ProductSchemaTypes];
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  products: {
    type: [ProductsSchema],
  },
});

UserSchema.pre<UserSchemaType>('save', async function (next: HookNextFunction) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default mongoose.model<UserSchemaType>('User', UserSchema);

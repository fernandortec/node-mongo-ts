import mongoose, { Document } from 'mongoose';

import DeparmentsSchema, { DepartmentsSchemaTypes } from './Departments';

export interface ProductSchemaTypes extends Document {
  name: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  department: DepartmentsSchemaTypes;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  department: {
    type: DeparmentsSchema,
    required:true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<ProductSchemaTypes>('Product', ProductSchema).schema;

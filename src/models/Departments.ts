import mongoose, { Document } from 'mongoose';

export interface DepartmentsSchemaTypes extends Document {
  name: "Alimentos" | "Eletrônicos" | "Eletrodomésticos" | "Hardware";
}

const DepartmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model<DepartmentsSchemaTypes>('Department',DepartmentsSchema).schema;

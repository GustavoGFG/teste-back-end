import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, require: true },
    category: { type: String, required: true },
    image_url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);

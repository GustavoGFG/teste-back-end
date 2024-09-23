import { UpdateWriteOpResult } from 'mongoose';
import { ProductData } from '../controllers/productController';
import Product, { IProduct } from '../models/Product';

export const productService = {
  createProduct: async (productData: ProductData): Promise<IProduct> => {
    const product = new Product(productData);
    return await product.save();
  },

  getAllProducts: async (): Promise<IProduct[]> => {
    return await Product.find().populate('category');
  },

  getProductById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id).populate('category');
  },

  updateProduct: async (
    id: string,
    updates: Partial<IProduct>
  ): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  },

  deleteProduct: async (id: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(id);
  },

  updateCategories: async (
    currentCategory: string,
    newCategory: string
  ): Promise<UpdateWriteOpResult> => {
    return await Product.updateMany(
      { category: currentCategory },
      { category: newCategory }
    );
  },
};

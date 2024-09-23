import { Request, Response } from 'express';
import { productService } from '../services/productService';
import {
  productSchema,
  updateCategorySchema,
  updateProductSchema,
} from '../validators/productValidation';
import { z } from 'zod';
import { IProduct } from '../models/Product';

export type ProductData = {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
};

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const parsedData = productSchema.parse(req.body) as ProductData;
      const product: IProduct = await productService.createProduct(parsedData);
      res
        .status(201)
        .json({ success: true, message: 'Product created', product });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: error.message,
      });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts();
      res.json({ success: true, products });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message,
      });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      res.json({ success: true, product });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message,
      });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const parsedUpdates = updateProductSchema.parse(
        req.body
      ) as Partial<IProduct>;
      const product = await productService.updateProduct(
        req.params.id,
        parsedUpdates
      );
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      res.json({ success: true, message: 'Product updated', product });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: error.message,
      });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      res.json({ success: true, message: 'Product deleted' });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: error.message,
      });
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      const { currentCategory, newCategory } = updateCategorySchema.parse(
        req.body
      );

      const updatedProducts = await productService.updateCategories(
        currentCategory,
        newCategory
      );

      if (updatedProducts.modifiedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhum produto encontrado com essa categoria.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Categoria atualizada com sucesso para todos os produtos.',
        updatedCount: updatedProducts.modifiedCount,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar categorias',
        error: error.message,
      });
    }
  },
};

export default productController;

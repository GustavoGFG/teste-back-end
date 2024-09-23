import { Router } from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/products', authMiddleware, productController.createProduct);
router.get('/products', authMiddleware, productController.getAllProducts);
router.get('/products/:id', authMiddleware, productController.getProductById);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);
router.put('/category', authMiddleware, productController.updateCategory);

export default router;

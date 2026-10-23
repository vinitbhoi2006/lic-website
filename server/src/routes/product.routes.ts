import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', ProductController.getPublicProducts);
router.get('/:slug', ProductController.getProductBySlug);

// Admin routes
router.get('/admin/all', requireAuth, requireAdmin, ProductController.getAllProductsAdmin);
router.post('/admin', requireAuth, requireAdmin, ProductController.createProduct);
router.put('/admin/:id', requireAuth, requireAdmin, ProductController.updateProduct);

export default router;

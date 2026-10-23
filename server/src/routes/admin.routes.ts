import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', AdminController.getDashboardMetrics);
router.get('/audit-logs', AdminController.getAuditLogs);
router.get('/notifications', AdminController.getNotifications);
router.get('/users', AdminController.getUsers);
router.put('/users/:id/status', AdminController.toggleUserStatus);

export default router;

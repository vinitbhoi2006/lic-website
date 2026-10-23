import { Router } from 'express';
import { ConsultationController } from '../controllers/consultation.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Customer booking
router.post('/', ConsultationController.requestConsultation);
router.get('/my', requireAuth, ConsultationController.getCustomerConsultations);

// Admin consultation schedule
router.get('/admin', requireAuth, requireAdmin, ConsultationController.getAllConsultationsAdmin);
router.put('/admin/:id', requireAuth, requireAdmin, ConsultationController.updateConsultationAdmin);

export default router;

import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiry.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public lead submission
router.post('/', EnquiryController.createEnquiry);

// Customer portal: get own enquiries
router.get('/my', requireAuth, EnquiryController.getCustomerEnquiries);

// Admin portal
router.get('/admin', requireAuth, requireAdmin, EnquiryController.getAllEnquiriesAdmin);
router.get('/admin/:id', requireAuth, requireAdmin, EnquiryController.getEnquiryByIdAdmin);
router.put('/admin/:id/status', requireAuth, requireAdmin, EnquiryController.updateStatusAdmin);
router.post('/admin/:id/notes', requireAuth, requireAdmin, EnquiryController.addNoteAdmin);

export default router;

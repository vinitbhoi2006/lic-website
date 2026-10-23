import { Response } from 'express';
import { prisma } from '../config/db';
import { createConsultationSchema } from '../validators/enquiry.validator';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AuditService } from '../services/audit.service';
import { NotificationService } from '../services/notification.service';
import { env } from '../config/env';

export class ConsultationController {
  public static async requestConsultation(req: AuthenticatedRequest, res: Response) {
    const parseResult = createConsultationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { enquiryId, requestedTime, mode, notes } = parseResult.data;

    const consultation = await prisma.consultation.create({
      data: {
        enquiryId: enquiryId || null,
        userId: req.user ? req.user.id : null,
        requestedTime: new Date(requestedTime),
        mode,
        status: 'REQUESTED',
        staffNotes: notes || null,
      },
    });

    // Notify Advisor
    NotificationService.send({
      recipient: env.ADVISOR_EMAIL,
      templateName: 'NEW_CONSULTATION_REQUEST',
      subject: `📅 New Consultation Booking: ${mode} at ${new Date(requestedTime).toLocaleString('en-IN')}`,
      body: `<p>A client has requested an insurance consultation via ${mode} on ${new Date(requestedTime).toLocaleString('en-IN')}.</p>`,
    }).catch(() => {});

    return sendSuccess(res, { consultation }, 'Consultation requested successfully.', 201);
  }

  public static async getCustomerConsultations(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401);
    }

    const consultations = await prisma.consultation.findMany({
      where: { userId: req.user.id },
      include: { enquiry: { select: { referenceNumber: true, category: true } } },
      orderBy: { requestedTime: 'asc' },
    });

    return sendSuccess(res, { consultations });
  }

  public static async getAllConsultationsAdmin(req: AuthenticatedRequest, res: Response) {
    const consultations = await prisma.consultation.findMany({
      include: {
        user: { select: { name: true, email: true, phone: true } },
        enquiry: { select: { referenceNumber: true, fullName: true, mobileNumber: true, category: true } },
      },
      orderBy: { requestedTime: 'desc' },
    });

    return sendSuccess(res, { consultations });
  }

  public static async updateConsultationAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { status, staffNotes } = req.body;

    const existing = await prisma.consultation.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Consultation not found', 404);
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(staffNotes !== undefined ? { staffNotes } : {}),
      },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'CONSULTATION_STATUS_UPDATED',
      entityType: 'Consultation',
      entityId: id,
      metadata: { status, staffNotes },
    });

    return sendSuccess(res, { consultation: updated }, 'Consultation updated successfully.');
  }
}

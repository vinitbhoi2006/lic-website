import { Request, Response } from 'express';
import { prisma } from '../config/db';
import {
  createEnquirySchema,
  updateEnquiryStatusSchema,
  addEnquiryNoteSchema,
} from '../validators/enquiry.validator';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { NotificationService } from '../services/notification.service';
import { AuditService } from '../services/audit.service';

export class EnquiryController {
  public static async createEnquiry(req: Request, res: Response) {
    const parseResult = createEnquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const data = parseResult.data;

    // Check duplicate spam submission within past 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const duplicate = await prisma.enquiry.findFirst({
      where: {
        mobileNumber: data.mobileNumber,
        category: data.category,
        createdAt: { gte: fifteenMinutesAgo },
      },
    });

    if (duplicate) {
      return sendError(
        res,
        'An identical enquiry was recently received. Please allow advisor Dnyaneshwar Yedu Bhoi time to review your request.',
        429
      );
    }

    // Generate unique human-readable reference number
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceNumber = `LIC-ENQ-2026-${randomSuffix}`;

    // Associate with logged-in user if token present
    let associatedUserId: string | null = null;
    const authReq = req as AuthenticatedRequest;
    if (authReq.user) {
      associatedUserId = authReq.user.id;
    } else {
      // Find if an account exists with this email
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser) {
        associatedUserId = existingUser.id;
      }
    }

    // Create enquiry transaction
    const enquiry = await prisma.enquiry.create({
      data: {
        referenceNumber,
        userId: associatedUserId,
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        city: data.city,
        category: data.category,
        preferredTime: data.preferredTime || 'Anytime',
        preferredLanguage: data.preferredLanguage || 'English',
        message: data.message,
        status: 'NEW',
        consentGiven: true,
        consentVersion: 'v1.0-2026',
      },
    });

    // Create initial status history entry
    await prisma.enquiryStatusHistory.create({
      data: {
        enquiryId: enquiry.id,
        fromStatus: 'NEW',
        toStatus: 'NEW',
        changedBy: 'System (Enquiry Created)',
        note: 'Customer enquiry submitted via portal.',
      },
    });

    // Record DPDP Compliance Consent Record
    await prisma.consentRecord.create({
      data: {
        enquiryId: enquiry.id,
        ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        consentText:
          'I consent to be contacted by LIC Insurance Advisor Dnyaneshwar Yedu Bhoi regarding my insurance enquiry.',
        consentPurpose: 'Insurance advisory contact and consultation',
      },
    });

    // Dispatch notifications asynchronously
    NotificationService.notifyAdvisorOfNewEnquiry(enquiry).catch(() => {});
    NotificationService.sendEnquiryAcknowledgement(enquiry).catch(() => {});

    return sendSuccess(
      res,
      {
        referenceNumber: enquiry.referenceNumber,
        createdAt: enquiry.createdAt,
      },
      'Your insurance enquiry has been securely registered. Reference: ' + enquiry.referenceNumber,
      201
    );
  }

  public static async getCustomerEnquiries(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401);
    }

    // Isolate customer data: only records for this user
    const enquiries = await prisma.enquiry.findMany({
      where: {
        OR: [{ userId: req.user.id }, { email: req.user.email }],
      },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            fromStatus: true,
            toStatus: true,
            changedBy: true,
            note: true,
            createdAt: true,
          },
        },
        consultations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, { enquiries });
  }

  public static async getAllEnquiriesAdmin(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';
    const category = (req.query.category as string) || '';

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { referenceNumber: { contains: search } },
        { fullName: { contains: search } },
        { mobileNumber: { contains: search } },
        { email: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const [total, enquiries] = await Promise.all([
      prisma.enquiry.count({ where }),
      prisma.enquiry.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          statusHistory: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
    ]);

    return sendPaginated(res, enquiries, { page, limit, total });
  }

  public static async getEnquiryByIdAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      include: {
        statusHistory: { orderBy: { createdAt: 'desc' } },
        consultations: { orderBy: { requestedTime: 'desc' } },
        consentRecords: true,
      },
    });

    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    return sendSuccess(res, { enquiry });
  }

  public static async updateStatusAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const parseResult = updateEnquiryStatusSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { status, internalNotes, assignedTo } = parseResult.data;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Enquiry not found', 404);
    }

    const oldStatus = existing.status;

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        status,
        ...(internalNotes !== undefined ? { internalNotes } : {}),
        ...(assignedTo !== undefined ? { assignedTo } : {}),
      },
    });

    // Record status transition in history
    await prisma.enquiryStatusHistory.create({
      data: {
        enquiryId: id,
        fromStatus: oldStatus,
        toStatus: status,
        changedBy: req.user?.name || 'Administrator',
        note: internalNotes || `Status updated from ${oldStatus} to ${status}`,
      },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'ENQUIRY_STATUS_UPDATED',
      entityType: 'Enquiry',
      entityId: id,
      metadata: { from: oldStatus, to: status, notes: internalNotes },
    });

    return sendSuccess(res, { enquiry: updated }, 'Enquiry status updated successfully.');
  }

  public static async addNoteAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const parseResult = addEnquiryNoteSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { note } = parseResult.data;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Enquiry not found', 404);
    }

    const updatedNotes = existing.internalNotes
      ? `${existing.internalNotes}\n[${new Date().toLocaleDateString('en-IN')}] ${req.user?.name || 'Staff'}: ${note}`
      : `[${new Date().toLocaleDateString('en-IN')}] ${req.user?.name || 'Staff'}: ${note}`;

    const updated = await prisma.enquiry.update({
      where: { id },
      data: { internalNotes: updatedNotes },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'ENQUIRY_NOTE_ADDED',
      entityType: 'Enquiry',
      entityId: id,
      metadata: { note },
    });

    return sendSuccess(res, { enquiry: updated }, 'Note added successfully.');
  }
}

import { Response } from 'express';
import { prisma } from '../config/db';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AuditService } from '../services/audit.service';

export class AdminController {
  public static async getDashboardMetrics(req: AuthenticatedRequest, res: Response) {
    try {
      const [
        totalEnquiries,
        newEnquiries,
        awaitingFollowUp,
        scheduledEnquiries,
        resolvedEnquiries,
        totalConsultations,
        totalUsers,
        allEnquiries,
        recentEnquiries,
      ] = await Promise.all([
        prisma.enquiry.count(),
        prisma.enquiry.count({ where: { status: 'NEW' } }),
        prisma.enquiry.count({ where: { status: 'FOLLOW_UP_REQUIRED' } }),
        prisma.enquiry.count({ where: { status: 'CONSULTATION_SCHEDULED' } }),
        prisma.enquiry.count({ where: { status: 'RESOLVED' } }),
        prisma.consultation.count(),
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
        prisma.enquiry.findMany({ select: { status: true, category: true, createdAt: true } }),
        prisma.enquiry.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            referenceNumber: true,
            fullName: true,
            mobileNumber: true,
            city: true,
            category: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

      // Category breakdown
      const categoryCounts: Record<string, number> = {};
      const statusCounts: Record<string, number> = {};
      const monthlyBuckets: Record<string, number> = {};

      for (const enq of allEnquiries) {
        // Categories
        categoryCounts[enq.category] = (categoryCounts[enq.category] || 0) + 1;
        // Statuses
        statusCounts[enq.status] = (statusCounts[enq.status] || 0) + 1;
        // Months (e.g. "Mar 2026")
        const monthYear = enq.createdAt.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        monthlyBuckets[monthYear] = (monthlyBuckets[monthYear] || 0) + 1;
      }

      const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
      const statusData = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
      const monthlyTrends = Object.entries(monthlyBuckets).map(([month, count]) => ({ month, count }));

      return sendSuccess(res, {
        metrics: {
          totalEnquiries,
          newEnquiries,
          awaitingFollowUp,
          scheduledEnquiries,
          resolvedEnquiries,
          totalConsultations,
          totalUsers,
        },
        categoryData,
        statusData,
        monthlyTrends,
        recentEnquiries,
      });
    } catch (err: any) {
      return sendError(res, 'Failed to calculate dashboard analytics', 500, err.message);
    }
  }

  public static async getAuditLogs(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    const [total, logs] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return sendPaginated(res, logs, { page, limit, total });
  }

  public static async getNotifications(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    const [total, notifications] = await Promise.all([
      prisma.notification.count(),
      prisma.notification.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return sendPaginated(res, notifications, { page, limit, total });
  }

  public static async getUsers(req: AuthenticatedRequest, res: Response) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { enquiries: true, consultations: true },
        },
      },
    });

    return sendSuccess(res, { users });
  }

  public static async toggleUserStatus(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { isActive } = req.body;

    // Prevent disabling oneself
    if (id === req.user?.id) {
      return sendError(res, 'You cannot disable your own administrator account', 400);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
      select: { id: true, email: true, name: true, isActive: true },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'USER_STATUS_TOGGLED',
      entityType: 'User',
      entityId: id,
      metadata: { isActive: updated.isActive },
    });

    return sendSuccess(res, { user: updated }, 'User account status updated.');
  }
}

import { prisma } from '../config/db';
import { logger } from '../utils/logger';

interface CreateAuditLogParams {
  userId?: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: any;
}

export class AuditService {
  public static async log(params: CreateAuditLogParams) {
    try {
      const record = await prisma.auditLog.create({
        data: {
          userId: params.userId || null,
          actorName: params.actorName,
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId,
          metadata: params.metadata ? JSON.stringify(params.metadata) : null,
        },
      });
      logger.info(`[AUDIT] ${params.action} on ${params.entityType}:${params.entityId} by ${params.actorName}`);
      return record;
    } catch (err: any) {
      logger.error('Failed to write audit log', { error: err.message, params });
      return null;
    }
  }
}

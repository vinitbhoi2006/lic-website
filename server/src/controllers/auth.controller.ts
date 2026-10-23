import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db';
import { registerSchema, loginSchema, updateProfileSchema, forgotPasswordSchema } from '../validators/auth.validator';
import { signToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AuditService } from '../services/audit.service';
import { NotificationService } from '../services/notification.service';

export class AuthController {
  public static async register(req: Request, res: Response) {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { email, name, phone, password } = parseResult.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendError(res, 'An account with this email address already exists.', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone: phone || null,
        passwordHash,
        role: 'CUSTOMER',
        isEmailVerified: false,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await AuditService.log({
      userId: user.id,
      actorName: user.name,
      action: 'USER_REGISTERED',
      entityType: 'User',
      entityId: user.id,
    });

    return sendSuccess(res, { user, token }, 'Registration successful.', 201);
  }

  public static async login(req: Request, res: Response) {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { email, password } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'This account has been disabled. Please contact the advisor.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const userSafe = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };

    return sendSuccess(res, { user: userSafe, token }, 'Login successful.');
  }

  public static async getMe(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, { user });
  }

  public static async updateProfile(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const parseResult = updateProfileSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { name, phone } = parseResult.data;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name ? { name } : {}),
        ...(phone !== undefined ? { phone: phone || null } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    return sendSuccess(res, { user: updatedUser }, 'Profile updated successfully.');
  }

  public static async forgotPassword(req: Request, res: Response) {
    const parseResult = forgotPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const { email } = parseResult.data;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success message to prevent user enumeration attacks
    if (user) {
      await NotificationService.send({
        recipient: email,
        templateName: 'PASSWORD_RESET_LINK',
        subject: 'Password Reset Request - LIC Advisory Services',
        body: `<p>Hello ${user.name}, a password reset was requested. For security, please contact advisor Dnyaneshwar Yedu Bhoi at 9923835939 for identity verification.</p>`,
      });
    }

    return sendSuccess(
      res,
      null,
      'If an account exists with this email address, password reset instructions have been logged/sent.'
    );
  }

  public static async logout(req: Request, res: Response) {
    return sendSuccess(res, null, 'Logged out successfully.');
  }
}

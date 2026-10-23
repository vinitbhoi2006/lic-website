import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { productSchema } from '../validators/product.validator';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AuditService } from '../services/audit.service';

export class ProductController {
  public static async getPublicProducts(req: Request, res: Response) {
    const { category } = req.query;

    const where: any = { isPublished: true };
    if (category && typeof category === 'string') {
      where.category = category;
    }

    const products = await prisma.insuranceProduct.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    const parsedProducts = products.map((p) => ({
      ...p,
      keyFeatures: JSON.parse(p.keyFeaturesJson || '[]'),
    }));

    return sendSuccess(res, { products: parsedProducts });
  }

  public static async getProductBySlug(req: Request, res: Response) {
    const { slug } = req.params;

    const product = await prisma.insuranceProduct.findUnique({
      where: { slug },
    });

    if (!product || !product.isPublished) {
      return sendError(res, 'Insurance product not found or unverified', 404);
    }

    return sendSuccess(res, {
      product: {
        ...product,
        keyFeatures: JSON.parse(product.keyFeaturesJson || '[]'),
      },
    });
  }

  public static async getAllProductsAdmin(req: AuthenticatedRequest, res: Response) {
    const products = await prisma.insuranceProduct.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const parsedProducts = products.map((p) => ({
      ...p,
      keyFeatures: JSON.parse(p.keyFeaturesJson || '[]'),
    }));

    return sendSuccess(res, { products: parsedProducts });
  }

  public static async createProduct(req: AuthenticatedRequest, res: Response) {
    const parseResult = productSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const data = parseResult.data;

    const existing = await prisma.insuranceProduct.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return sendError(res, 'Product with this slug already exists', 409);
    }

    const product = await prisma.insuranceProduct.create({
      data: {
        slug: data.slug,
        category: data.category,
        title: data.title,
        tagline: data.tagline,
        description: data.description,
        intendedAudience: data.intendedAudience,
        keyFeaturesJson: JSON.stringify(data.keyFeatures),
        officialSourceUrl: data.officialSourceUrl,
        lastVerifiedDate: data.lastVerifiedDate ? new Date(data.lastVerifiedDate) : new Date(),
        isPublished: data.isPublished,
        isDiscontinued: data.isDiscontinued,
      },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'PRODUCT_CREATED',
      entityType: 'InsuranceProduct',
      entityId: product.id,
      metadata: { slug: product.slug, title: product.title },
    });

    return sendSuccess(res, { product }, 'Product created successfully', 201);
  }

  public static async updateProduct(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const parseResult = productSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Validation error', 422, parseResult.error.format());
    }

    const data = parseResult.data;

    const existing = await prisma.insuranceProduct.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Product not found', 404);
    }

    const updated = await prisma.insuranceProduct.update({
      where: { id },
      data: {
        ...(data.title ? { title: data.title } : {}),
        ...(data.tagline ? { tagline: data.tagline } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.intendedAudience ? { intendedAudience: data.intendedAudience } : {}),
        ...(data.keyFeatures ? { keyFeaturesJson: JSON.stringify(data.keyFeatures) } : {}),
        ...(data.officialSourceUrl ? { officialSourceUrl: data.officialSourceUrl } : {}),
        ...(data.lastVerifiedDate ? { lastVerifiedDate: new Date(data.lastVerifiedDate) } : {}),
        ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
        ...(data.isDiscontinued !== undefined ? { isDiscontinued: data.isDiscontinued } : {}),
      },
    });

    await AuditService.log({
      userId: req.user?.id,
      actorName: req.user?.name || 'Admin',
      action: 'PRODUCT_UPDATED',
      entityType: 'InsuranceProduct',
      entityId: updated.id,
      metadata: { slug: updated.slug },
    });

    return sendSuccess(res, { product: updated }, 'Product updated successfully');
  }
}

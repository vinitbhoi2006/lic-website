import { z } from 'zod';

export const productSchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.enum([
    'TERM_INSURANCE',
    'WHOLE_LIFE',
    'ENDOWMENT',
    'MONEY_BACK',
    'CHILD_FOCUSED',
    'RETIREMENT_PENSION',
    'ULIP',
    'GROUP_INSURANCE',
  ]),
  title: z.string().min(3, 'Title is required'),
  tagline: z.string().min(5, 'Tagline is required'),
  description: z.string().min(20, 'Detailed verified description is required'),
  intendedAudience: z.string().min(5, 'Intended target audience is required'),
  keyFeatures: z.array(z.string().min(3)).min(1, 'At least one verified key feature is required'),
  officialSourceUrl: z.string().url('Official LIC website verification URL is required'),
  lastVerifiedDate: z.string().datetime().optional(),
  isPublished: z.boolean().default(true),
  isDiscontinued: z.boolean().default(false),
});

import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env from root or server dir
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((v) => parseInt(v, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(16).default('lic-insurance-advisory-secret-key-super-secure-2026-min32chars'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  ADVISOR_NAME: z.string().default('Dnyaneshwar Yedu Bhoi'),
  ADVISOR_PRIMARY_PHONE: z.string().default('9923835939'),
  ADVISOR_SECONDARY_PHONE: z.string().default('7972131176'),
  ADVISOR_EMAIL: z.string().default('licdybhoi@gmail.com'),
  ADVISOR_WHATSAPP: z.string().default('919923835939'),
  SMTP_HOST: z.string().optional().default(''),
  SMTP_PORT: z.string().default('587').transform((v) => parseInt(v, 10)),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASS: z.string().optional().default(''),
  SMTP_FROM: z.string().default('LIC Advisory Services <licdybhoi@gmail.com>'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

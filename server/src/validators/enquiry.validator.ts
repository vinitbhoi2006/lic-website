import { z } from 'zod';

export const createEnquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required (minimum 2 characters)'),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)'),
  email: z.string().email('Please enter a valid email address'),
  city: z.string().min(2, 'City is required'),
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
  preferredTime: z.string().optional().default('Anytime'),
  preferredLanguage: z.enum(['English', 'Marathi', 'Hindi']).default('English'),
  message: z.string().min(10, 'Message must be at least 10 characters detailing your query'),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must provide consent to be contacted regarding your insurance enquiry' }),
  }),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum([
    'NEW',
    'CONTACTED',
    'CONSULTATION_SCHEDULED',
    'FOLLOW_UP_REQUIRED',
    'RESOLVED',
    'CLOSED',
  ]),
  internalNotes: z.string().optional(),
  assignedTo: z.string().optional(),
});

export const addEnquiryNoteSchema = z.object({
  note: z.string().min(2, 'Note content is required'),
});

export const createConsultationSchema = z.object({
  enquiryId: z.string().optional(),
  requestedTime: z.string().datetime({ message: 'Valid date and time is required' }),
  mode: z.enum(['Phone', 'Video Call', 'In-Person']).default('Phone'),
  notes: z.string().optional(),
});

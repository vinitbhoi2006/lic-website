export type ProductCategory =
  | 'TERM_INSURANCE'
  | 'WHOLE_LIFE'
  | 'ENDOWMENT'
  | 'MONEY_BACK'
  | 'CHILD_FOCUSED'
  | 'RETIREMENT_PENSION'
  | 'ULIP'
  | 'GROUP_INSURANCE';

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'CONSULTATION_SCHEDULED'
  | 'FOLLOW_UP_REQUIRED'
  | 'RESOLVED'
  | 'CLOSED';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'ADVISOR';
  isEmailVerified: boolean;
  createdAt: string;
}

export interface InsuranceProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  title: string;
  tagline: string;
  description: string;
  intendedAudience: string;
  keyFeatures: string[];
  officialSourceUrl: string;
  lastVerifiedDate: string;
  isPublished: boolean;
  isDiscontinued: boolean;
}

export interface EnquiryStatusHistory {
  id: string;
  fromStatus: EnquiryStatus;
  toStatus: EnquiryStatus;
  changedBy: string;
  note?: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  enquiryId?: string | null;
  requestedTime: string;
  mode: 'Phone' | 'Video Call' | 'In-Person';
  status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  staffNotes?: string | null;
  createdAt: string;
  enquiry?: {
    referenceNumber: string;
    category: ProductCategory;
    fullName?: string;
    mobileNumber?: string;
  };
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface Enquiry {
  id: string;
  referenceNumber: string;
  userId?: string | null;
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  category: ProductCategory;
  preferredTime?: string;
  preferredLanguage: 'English' | 'Marathi' | 'Hindi';
  message: string;
  status: EnquiryStatus;
  internalNotes?: string | null;
  assignedTo?: string | null;
  consentGiven: boolean;
  createdAt: string;
  updatedAt: string;
  statusHistory?: EnquiryStatusHistory[];
  consultations?: Consultation[];
}

export interface DashboardMetrics {
  totalEnquiries: number;
  newEnquiries: number;
  awaitingFollowUp: number;
  scheduledEnquiries: number;
  resolvedEnquiries: number;
  totalConsultations: number;
  totalUsers: number;
}

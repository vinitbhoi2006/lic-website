import { InsuranceProduct, Enquiry, Consultation, User, DashboardMetrics } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; error?: string; message?: string; pagination?: any }> {
  const token = localStorage.getItem('lic_auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({
    success: false,
    error: `HTTP ${res.status}: Failed to parse JSON response`,
  }));

  if (!res.ok) {
    throw new Error(json.error || json.message || `Request failed with status ${res.status}`);
  }

  return json;
}

export const apiClient = {
  // Public
  getProducts: (category?: string) => {
    const query = category ? `?category=${category}` : '';
    return request<{ products: InsuranceProduct[] }>(`/products${query}`);
  },
  getProductBySlug: (slug: string) => {
    return request<{ product: InsuranceProduct }>(`/products/${slug}`);
  },
  submitEnquiry: (data: any) => {
    return request<{ referenceNumber: string; createdAt: string }>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Auth
  login: (data: { email: string; password: string }) => {
    return request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  register: (data: { name: string; email: string; phone?: string; password: string }) => {
    return request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getMe: () => {
    return request<{ user: User }>('/auth/me');
  },
  updateProfile: (data: { name?: string; phone?: string }) => {
    return request<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Customer
  getCustomerEnquiries: () => {
    return request<{ enquiries: Enquiry[] }>('/enquiries/my');
  },
  bookConsultation: (data: { enquiryId?: string; requestedTime: string; mode: string; notes?: string }) => {
    return request<{ consultation: Consultation }>('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getCustomerConsultations: () => {
    return request<{ consultations: Consultation[] }>('/consultations/my');
  },

  // Admin
  getAdminDashboard: () => {
    return request<{
      metrics: DashboardMetrics;
      categoryData: { name: string; value: number }[];
      statusData: { status: string; count: number }[];
      monthlyTrends: { month: string; count: number }[];
      recentEnquiries: Enquiry[];
    }>('/admin/dashboard');
  },
  getAdminEnquiries: (params?: { page?: number; limit?: number; search?: string; status?: string; category?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.append('page', params.page.toString());
    if (params?.limit) q.append('limit', params.limit.toString());
    if (params?.search) q.append('search', params.search);
    if (params?.status) q.append('status', params.status);
    if (params?.category) q.append('category', params.category);
    return request<Enquiry[]>(`/enquiries/admin?${q.toString()}`);
  },
  getAdminEnquiryById: (id: string) => {
    return request<{ enquiry: Enquiry }>(`/enquiries/admin/${id}`);
  },
  updateAdminEnquiryStatus: (id: string, data: { status: string; internalNotes?: string; assignedTo?: string }) => {
    return request<{ enquiry: Enquiry }>(`/enquiries/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  addAdminEnquiryNote: (id: string, note: string) => {
    return request<{ enquiry: Enquiry }>(`/enquiries/admin/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  },
  getAdminProducts: () => {
    return request<{ products: InsuranceProduct[] }>('/products/admin/all');
  },
  createAdminProduct: (data: any) => {
    return request<{ product: InsuranceProduct }>('/products/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateAdminProduct: (id: string, data: any) => {
    return request<{ product: InsuranceProduct }>(`/products/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  getAdminAuditLogs: (page = 1) => {
    return request<any[]>(`/admin/audit-logs?page=${page}`);
  },
  getAdminNotifications: (page = 1) => {
    return request<any[]>(`/admin/notifications?page=${page}`);
  },
  getAdminUsers: () => {
    return request<{ users: any[] }>('/admin/users');
  },
  toggleAdminUserStatus: (id: string, isActive: boolean) => {
    return request<{ user: any }>(`/admin/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  },
};

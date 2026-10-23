import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount);
}

export function getStatusBadgeClasses(status: string): string {
  switch (status) {
    case 'NEW':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'CONTACTED':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'CONSULTATION_SCHEDULED':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'FOLLOW_UP_REQUIRED':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'RESOLVED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'CLOSED':
      return 'bg-slate-100 text-slate-800 border-slate-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

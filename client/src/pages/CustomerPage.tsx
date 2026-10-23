import React from 'react';
import { CustomerPortal } from '../features/customer/CustomerPortal';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerPage: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-bg">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-content-secondary font-medium">Loading customer account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-bg px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-premium border border-gray-200 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-800">Authentication Required</h2>
            <p className="text-xs text-content-secondary mt-1">
              Please sign in to your verified customer account to access your submitted inquiries and consultations.
            </p>
          </div>

          <button
            onClick={onOpenAuth}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl text-xs font-bold transition shadow-sm"
          >
            Sign In / Register Customer Account
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-content-secondary hover:text-navy-800 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return <CustomerPortal />;
};

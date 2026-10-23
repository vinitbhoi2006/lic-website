import React, { useState, useEffect } from 'react';
import {
  User,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Phone,
  Video,
  MapPin,
  Send,
  Shield,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Enquiry, Consultation } from '../../types';
import { getStatusBadgeClasses, formatINR } from '../../lib/utils';

export const CustomerPortal: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'enquiries' | 'consultations' | 'profile'>('enquiries');

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Profile Form
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // New Consultation Form
  const [requestedTime, setRequestedTime] = useState('');
  const [consultationMode, setConsultationMode] = useState<'Phone' | 'Video Call' | 'In-Person'>('Phone');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [enqRes, consRes] = await Promise.all([
          apiClient.getCustomerEnquiries(),
          apiClient.getCustomerConsultations(),
        ]);
        if (enqRes.data?.enquiries) {
          setEnquiries(enqRes.data.enquiries);
        }
        if (consRes.data?.consultations) {
          setConsultations(consRes.data.consultations);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load customer records.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(null);
    try {
      const res = await apiClient.updateProfile({ name: editName, phone: editPhone });
      if (res.data?.user) {
        updateUser(res.data.user);
        setProfileSuccess('Profile updated successfully.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingSuccess(null);
    try {
      const res = await apiClient.bookConsultation({
        requestedTime: new Date(requestedTime).toISOString(),
        mode: consultationMode,
        notes: consultationNotes,
      });
      if (res.data?.consultation) {
        setConsultations([res.data.consultation, ...consultations]);
        setBookingSuccess('Consultation request submitted! Advisor Dnyaneshwar Bhoi will confirm your slot.');
        setRequestedTime('');
        setConsultationNotes('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to request consultation.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-primary text-white rounded-3xl p-6 sm:p-8 shadow-premium mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent-gold text-xs font-semibold uppercase tracking-wider mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Customer Advisory Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Welcome back, {user?.name}
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              {user?.email} • Track your policy inquiries and schedule discussions with Advisor Dnyaneshwar Bhoi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white rounded-2xl p-1.5 shadow-subtle">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'enquiries'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Inquiries ({enquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'consultations'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultations ({consultations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Account</span>
          </button>
        </div>

        {/* Tab 1: Enquiries Tracking */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-navy-800">
                Submitted Insurance Inquiries
              </h2>
              <span className="text-xs text-content-secondary">
                Data isolation: Showing inquiries associated with your verified account.
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-navy-800">No Inquiries Found</h3>
                <p className="text-xs text-content-secondary mt-1">
                  You have not submitted an inquiry yet. Submit one from the home portal to get advisor guidance.
                </p>
                <a
                  href="/#contact"
                  className="mt-4 inline-block bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Submit Inquiry
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-subtle space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-navy-800">
                            {enq.referenceNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadgeClasses(
                              enq.status
                            )}`}
                          >
                            {enq.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-content-secondary mt-0.5 block">
                          Category: {enq.category.replace(/_/g, ' ')} • Submitted on{' '}
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="text-xs text-content-secondary">
                        Preferred Language: <strong>{enq.preferredLanguage}</strong>
                      </div>
                    </div>

                    <div className="bg-surface-bg p-3.5 rounded-xl border border-gray-100 text-xs text-content-primary">
                      <strong className="block text-content-secondary text-[11px] mb-1">
                        Your Query:
                      </strong>
                      <p>{enq.message}</p>
                    </div>

                    {/* Status History Timeline */}
                    {enq.statusHistory && enq.statusHistory.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-navy-800 uppercase tracking-wide block mb-2">
                          Status Transition History:
                        </span>
                        <div className="space-y-2">
                          {enq.statusHistory.map((hist) => (
                            <div
                              key={hist.id}
                              className="flex items-start gap-2.5 text-xs text-content-secondary bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-navy-800">
                                  {hist.toStatus.replace(/_/g, ' ')}
                                </span>
                                <span className="text-[11px] text-gray-500 ml-2">
                                  by {hist.changedBy} on{' '}
                                  {new Date(hist.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                                {hist.note && (
                                  <p className="text-[11px] text-gray-600 mt-0.5">
                                    "{hist.note}"
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Consultations */}
        {activeTab === 'consultations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Book Consultation Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-5">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </div>
              <h3 className="text-base font-bold text-navy-800">
                Schedule a Consultation with Advisor Dnyaneshwar Bhoi
              </h3>

              {bookingSuccess && (
                <div className="bg-emerald-50 text-status-success text-xs p-3 rounded-xl border border-emerald-200">
                  {bookingSuccess}
                </div>
              )}

              <form onSubmit={handleBookConsultation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1">
                    Requested Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1">
                    Meeting Mode
                  </label>
                  <select
                    value={consultationMode}
                    onChange={(e) => setConsultationMode(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    <option value="Phone">Phone Call (9923835939)</option>
                    <option value="Video Call">Virtual Video Call (Google Meet / Zoom)</option>
                    <option value="In-Person">In-Person (Maharashtra / Pune / Nashik)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1">
                    Notes / Topics for Discussion
                  </label>
                  <textarea
                    rows={3}
                    value={consultationNotes}
                    onChange={(e) => setConsultationNotes(e.target.value)}
                    placeholder="e.g. Discuss term plan vs endowment for family protection..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Consultation Slot</span>
                </button>
              </form>
            </div>

            {/* Existing Consultations List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-bold text-navy-800 text-sm">
                Your Scheduled & Past Consultations
              </h3>

              {consultations.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-xs text-content-secondary">
                  No consultation appointments booked yet. Use the form on the left to schedule a time.
                </div>
              ) : (
                <div className="space-y-3">
                  {consultations.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle flex justify-between items-start"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy-800 text-xs">
                            {c.mode} Consultation
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-status-success'
                                : 'bg-amber-100 text-status-warning'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-content-secondary flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>
                            {new Date(c.requestedTime).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </span>
                        </p>
                        {c.staffNotes && (
                          <p className="text-[11px] text-gray-500 mt-1 italic">
                            Advisor Note: {c.staffNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Customer Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-200 shadow-subtle space-y-6">
            <h3 className="text-base font-bold text-navy-800">
              Account Profile Information
            </h3>

            {profileSuccess && (
              <div className="bg-emerald-50 text-status-success text-xs p-3 rounded-xl border border-emerald-200">
                {profileSuccess}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Email Address (Verified Account Identity)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Email identity cannot be edited directly for audit trail integrity.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="10-digit Indian Mobile"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="w-full bg-navy-800 hover:bg-navy-900 text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

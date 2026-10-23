import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  BarChart3,
  Calendar,
  Lock,
  MessageSquare,
  History,
  Mail,
  ChevronRight,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { Enquiry, DashboardMetrics, InsuranceProduct } from '../../types';
import { getStatusBadgeClasses } from '../../lib/utils';

const COLORS = ['#174EA6', '#3478F6', '#D6AD60', '#16845B', '#C63D46', '#8F9CAE', '#6B21A8'];

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'products' | 'audit' | 'notifications'>('overview');

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<any[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);

  // Enquiries Table
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Status Update Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newStatus, setNewStatus] = useState<string>('NEW');
  const [internalNote, setInternalNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // CMS Products
  const [products, setProducts] = useState<InsuranceProduct[]>([]);

  // Audit Logs & Notifications
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch Dashboard Metrics
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const res = await apiClient.getAdminDashboard();
        if (res.data) {
          setMetrics(res.data.metrics);
          setCategoryData(res.data.categoryData || []);
          setStatusData(res.data.statusData || []);
          setMonthlyTrends(res.data.monthlyTrends || []);
          setRecentEnquiries(res.data.recentEnquiries || []);
        }
      } catch (err) {
        console.error('Failed to load admin metrics', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [refreshKey]);

  // Fetch Enquiries
  useEffect(() => {
    async function loadEnquiries() {
      try {
        setLoadingEnquiries(true);
        const res = await apiClient.getAdminEnquiries({
          search: searchTerm,
          status: statusFilter,
          limit: 50,
        });
        if (res.data) {
          setEnquiries(res.data);
        }
      } catch (err) {
        console.error('Failed to load enquiries', err);
      } finally {
        setLoadingEnquiries(false);
      }
    }
    if (activeTab === 'enquiries' || activeTab === 'overview') {
      loadEnquiries();
    }
  }, [activeTab, searchTerm, statusFilter, refreshKey]);

  // Fetch Products for CMS
  useEffect(() => {
    if (activeTab === 'products') {
      apiClient.getAdminProducts().then((res) => {
        if (res.data?.products) setProducts(res.data.products);
      });
    }
  }, [activeTab, refreshKey]);

  // Fetch Audit Logs
  useEffect(() => {
    if (activeTab === 'audit') {
      apiClient.getAdminAuditLogs().then((res) => {
        if (res.data) setAuditLogs(res.data);
      });
    }
  }, [activeTab, refreshKey]);

  // Fetch Notifications
  useEffect(() => {
    if (activeTab === 'notifications') {
      apiClient.getAdminNotifications().then((res) => {
        if (res.data) setNotifications(res.data);
      });
    }
  }, [activeTab, refreshKey]);

  const handleOpenStatusModal = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNewStatus(enq.status);
    setInternalNote('');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setUpdatingStatus(true);
    try {
      await apiClient.updateAdminEnquiryStatus(selectedEnquiry.id, {
        status: newStatus,
        internalNotes: internalNote || undefined,
      });
      setSelectedEnquiry(null);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-premium mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Administrative Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Advisor Admin Dashboard
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Advisor: <strong>Dnyaneshwar Yedu Bhoi</strong> • Real-time database metrics & lead management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Data</span>
            </button>
            <button
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold px-4 py-2 rounded-xl border border-red-500/30 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white rounded-2xl p-1.5 shadow-subtle overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'enquiries'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lead & Enquiry Management ({enquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'products'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Insurance Content CMS</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'audit'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Audit Trail Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'notifications'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Notifications Dispatcher</span>
          </button>
        </div>

        {/* Tab 1: Overview & Analytics */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-content-secondary block">
                  Total Enquiries
                </span>
                <span className="text-2xl font-black text-navy-800 tabular-nums">
                  {metrics?.totalEnquiries ?? 0}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-blue-600 block">
                  New Uncontacted
                </span>
                <span className="text-2xl font-black text-blue-600 tabular-nums">
                  {metrics?.newEnquiries ?? 0}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-amber-600 block">
                  Follow-up Needed
                </span>
                <span className="text-2xl font-black text-amber-600 tabular-nums">
                  {metrics?.awaitingFollowUp ?? 0}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-purple-600 block">
                  Consultations
                </span>
                <span className="text-2xl font-black text-purple-600 tabular-nums">
                  {metrics?.scheduledEnquiries ?? 0}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-emerald-600 block">
                  Resolved / Closed
                </span>
                <span className="text-2xl font-black text-emerald-600 tabular-nums">
                  {metrics?.resolvedEnquiries ?? 0}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
                <span className="text-[11px] font-semibold text-content-secondary block">
                  Active Customers
                </span>
                <span className="text-2xl font-black text-navy-800 tabular-nums">
                  {metrics?.totalUsers ?? 0}
                </span>
              </div>
            </div>

            {/* Recharts Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Breakdown Bar Chart */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle">
                <h3 className="text-sm font-bold text-navy-800 mb-4 flex items-center justify-between">
                  <span>Enquiries by Insurance Category</span>
                  <span className="text-[11px] font-normal text-content-secondary">
                    Real database aggregation
                  </span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#174EA6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Workflow Distribution Pie Chart */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle">
                <h3 className="text-sm font-bold text-navy-800 mb-4 flex items-center justify-between">
                  <span>Workflow Status Distribution</span>
                  <span className="text-[11px] font-normal text-content-secondary">
                    Lead pipeline stages
                  </span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ status, count }) => `${status}: ${count}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-subtle space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-navy-800">
                  Recent Inquiries Received
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>View All Leads</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {recentEnquiries.map((enq) => (
                  <div key={enq.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-navy-800">{enq.fullName}</span>
                        <span className="text-[11px] text-content-secondary font-mono">
                          {enq.referenceNumber}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClasses(
                            enq.status
                          )}`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {enq.city} • Category: {enq.category} • Mobile: {enq.mobileNumber}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenStatusModal(enq)}
                      className="bg-surface-bg hover:bg-gray-100 text-navy-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 transition"
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries Management Table */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-subtle p-6 space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, ref, phone, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CONSULTATION_SCHEDULED">CONSULTATION_SCHEDULED</option>
                  <option value="FOLLOW_UP_REQUIRED">FOLLOW_UP_REQUIRED</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-content-secondary uppercase text-[10px] tracking-wider bg-surface-bg">
                    <th className="py-3 px-4">Ref Number</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Pref. Time & Lang</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-navy-800">
                        {enq.referenceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-navy-800 block">{enq.fullName}</strong>
                        <span className="text-gray-500 tabular-nums">
                          +91 {enq.mobileNumber} • {enq.city}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-navy-700">
                        {enq.category.replace(/_/g, ' ')}
                      </td>
                      <td className="py-3.5 px-4 text-content-secondary">
                        <span className="block">{enq.preferredTime || 'Anytime'}</span>
                        <span className="text-[11px] text-primary">{enq.preferredLanguage}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadgeClasses(
                            enq.status
                          )}`}
                        >
                          {enq.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenStatusModal(enq)}
                          className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {enquiries.length === 0 && (
                <div className="text-center py-10 text-xs text-content-secondary">
                  No enquiries matching filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Products CMS */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-subtle p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-navy-800">
                  Insurance Product Offerings & Brochures
                </h3>
                <p className="text-xs text-content-secondary">
                  Displaying strictly verified LIC plan brochures. Unverified or discontinued plans are hidden from public.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl border border-gray-200 bg-surface-bg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {p.category}
                      </span>
                      <span className="text-[11px] text-content-secondary">
                        Verified: {new Date(p.lastVerifiedDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <h4 className="font-bold text-navy-800 text-sm">{p.title}</h4>
                    <p className="text-xs text-accent-gold-dark font-medium mt-0.5">{p.tagline}</p>
                    <p className="text-xs text-content-secondary mt-2">{p.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                    <a
                      href={p.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Official Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.isPublished ? 'bg-emerald-100 text-status-success' : 'bg-red-100 text-status-error'
                      }`}
                    >
                      {p.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-subtle p-6 space-y-4">
            <h3 className="text-sm font-bold text-navy-800">
              System & Administrative Security Audit Trail
            </h3>
            <div className="divide-y divide-gray-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between">
                  <div>
                    <strong className="text-navy-800 font-bold block">{log.action}</strong>
                    <span className="text-content-secondary text-[11px]">
                      Actor: {log.actorName} • Entity: {log.entityType} ({log.entityId})
                    </span>
                    {log.metadata && (
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                        {log.metadata}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Notifications Dispatcher Log */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-subtle p-6 space-y-4">
            <h3 className="text-sm font-bold text-navy-800">
              Notifications & Outgoing Email Dispatcher
            </h3>
            <p className="text-xs text-content-secondary">
              Logs all customer acknowledgements and alerts dispatched to Advisor Dnyaneshwar Bhoi (licdybhoi@gmail.com).
            </p>
            <div className="divide-y divide-gray-100 text-xs">
              {notifications.map((n) => (
                <div key={n.id} className="py-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-navy-800">{n.templateName}</strong>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          n.status === 'SENT'
                            ? 'bg-emerald-100 text-status-success'
                            : n.status === 'SIMULATED_DEV'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-status-error'
                        }`}
                      >
                        {n.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-content-secondary block mt-0.5">
                      To: {n.recipient} • Ref: {n.providerRef || 'N/A'}
                    </span>
                    <span className="text-[11px] text-gray-500 block">{n.subject}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(n.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status & Workflow Update Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-premium border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="bg-navy-900 text-white p-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-accent-gold font-bold">
                  {selectedEnquiry.referenceNumber}
                </span>
                <span className="text-xs text-gray-300">{selectedEnquiry.fullName}</span>
              </div>
              <h3 className="text-lg font-bold mt-1">Update Lead Status & Notes</h3>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CONSULTATION_SCHEDULED">CONSULTATION_SCHEDULED</option>
                  <option value="FOLLOW_UP_REQUIRED">FOLLOW_UP_REQUIRED</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  Internal Staff Note (Audit Trail)
                </label>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Record summary of conversation with customer, next follow-up date, or quote details..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="flex-1 bg-surface-muted text-navy-800 py-2.5 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingStatus}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  {updatingStatus ? 'Saving...' : 'Save Status Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

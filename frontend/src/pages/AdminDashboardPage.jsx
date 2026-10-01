import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTruck, FaSignOutAlt, FaInbox } from 'react-icons/fa';
import { logout } from '../services/authService.js';
import { getLeads, updateLeadStatus } from '../services/leadService.js';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'rejected', label: 'Rejected' }
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  ...STATUS_OPTIONS
];

const STATUS_STYLES = {
  new: 'bg-[#4A90A4]/20 text-[#4A90A4] border border-[#4A90A4]/30',
  contacted: 'bg-[#2C5F8A]/20 text-[#2C5F8A] border border-[#2C5F8A]/30',
  qualified: 'bg-[#1B4D3E]/20 text-emerald-400 border border-emerald-700/30',
  rejected: 'bg-red-900/20 text-red-400 border border-red-800/30'
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const result = await getLeads({ limit: 200 });
        const sorted = (result.data?.leads || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLeads(sorted);
      } catch (err) {
        toast.error(err.message || 'Failed to load leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    try {
      await updateLeadStatus(id, newStatus);
      setLeads((prev) =>
        prev.map((lead) => lead._id === id ? { ...lead, status: newStatus } : lead)
      );
      toast.success('Status updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <DashboardHeader onLogout={handleLogout} count={filtered.length} />

      <div className="container-custom py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            {loading ? 'Loading...' : `${filtered.length} submission${filtered.length !== 1 ? 's' : ''}`}
          </h2>

          <div className="w-full sm:w-52">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F8A] focus:border-transparent outline-none bg-white text-[var(--color-text)]"
              aria-label="Filter by status"
            >
              {FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <DesktopTable leads={filtered} onStatusChange={handleStatusChange} />
            <MobileCards leads={filtered} onStatusChange={handleStatusChange} />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardHeader = memo(({ onLogout, count }) => (
  <header className="bg-[#0F1B2E] text-white shadow-lg sticky top-0 z-40">
    <div className="container-custom py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaTruck className="text-xl text-[#2C5F8A]" />
        <div>
          <span className="font-bold text-base">NEXMOVE</span>
          <span className="text-gray-400 text-sm ml-2">Admin</span>
        </div>
        <span className="ml-4 text-sm text-gray-300 hidden sm:block">Carrier Submissions</span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm px-3 py-2 rounded-lg hover:bg-white/10 min-h-[44px]"
        aria-label="Logout"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  </header>
));
DashboardHeader.displayName = 'DashboardHeader';

const LoadingState = memo(() => (
  <div className="flex items-center justify-center py-24">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F8A] mx-auto mb-4"></div>
      <p className="text-gray-500 text-sm">Loading submissions...</p>
    </div>
  </div>
));
LoadingState.displayName = 'LoadingState';

const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <FaInbox className="text-5xl text-gray-300 mb-4" />
    <p className="text-gray-500 font-medium">No submissions yet</p>
    <p className="text-gray-400 text-sm mt-1">Carrier applications will appear here</p>
  </div>
));
EmptyState.displayName = 'EmptyState';

const StatusBadge = memo(({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[status] || ''}`}>
    {status}
  </span>
));
StatusBadge.displayName = 'StatusBadge';

const StatusSelect = memo(({ id, status, onChange }) => (
  <select
    value={status}
    onChange={(e) => onChange(id, e.target.value)}
    className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5F8A] focus:border-transparent outline-none bg-white text-[var(--color-text)] min-h-[36px]"
    aria-label="Update lead status"
  >
    {STATUS_OPTIONS.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
));
StatusSelect.displayName = 'StatusSelect';

const DesktopTable = memo(({ leads, onStatusChange }) => (
  <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200">
    <table className="w-full text-sm text-left">
      <thead className="bg-[#0F1B2E] text-gray-300 text-xs uppercase tracking-wider">
        <tr>
          {['Full Name', 'Company', 'Email', 'Phone', 'Truck Type', 'MC #', 'DOT #', 'Status', 'Submitted'].map((col) => (
            <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {leads.map((lead) => (
          <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 font-medium text-[var(--color-text)] whitespace-nowrap">{lead.fullName}</td>
            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.companyName}</td>
            <td className="px-4 py-3 text-gray-600">
              <a href={`mailto:${lead.email}`} className="hover:text-[#2C5F8A] transition-colors">{lead.email}</a>
            </td>
            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.phone}</td>
            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.truckType}</td>
            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.mcNumber}</td>
            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.dotNumber}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              <StatusSelect id={lead._id} status={lead.status} onChange={onStatusChange} />
            </td>
            <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">{formatDate(lead.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));
DesktopTable.displayName = 'DesktopTable';

const MobileCards = memo(({ leads, onStatusChange }) => (
  <div className="md:hidden space-y-4">
    {leads.map((lead) => (
      <div key={lead._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-[var(--color-text)]">{lead.fullName}</p>
            <p className="text-sm text-gray-500">{lead.companyName}</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        <div className="space-y-1.5 text-sm mb-4">
          <CardRow label="Email" value={<a href={`mailto:${lead.email}`} className="text-[#2C5F8A]">{lead.email}</a>} />
          <CardRow label="Phone" value={lead.phone} />
          <CardRow label="Truck Type" value={lead.truckType} />
          <CardRow label="MC #" value={lead.mcNumber} />
          <CardRow label="DOT #" value={lead.dotNumber} />
          <CardRow label="Submitted" value={formatDate(lead.createdAt)} />
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">Update Status:</span>
          <StatusSelect id={lead._id} status={lead.status} onChange={onStatusChange} />
        </div>
      </div>
    ))}
  </div>
));
MobileCards.displayName = 'MobileCards';

const CardRow = memo(({ label, value }) => (
  <div className="flex gap-2">
    <span className="text-gray-400 w-24 flex-shrink-0">{label}</span>
    <span className="text-[var(--color-text)] break-all">{value}</span>
  </div>
));
CardRow.displayName = 'CardRow';

export default AdminDashboardPage;

import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdminDashboard({ token }) {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingLeadId, setSavingLeadId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const query = statusFilter === 'All' ? '' : `?status=${encodeURIComponent(statusFilter)}`;
        const response = await fetch(`${API_BASE_URL}/api/leads${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.message || 'Unable to load leads.');
        }

        const data = await response.json();
        setLeads(data.leads || []);
      } catch (err) {
        setError(err.message || 'Failed to load lead data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [statusFilter, token]);

  const handleLeadChange = (leadId, field, value) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) => (lead._id === leadId ? { ...lead, [field]: value } : lead))
    );
  };

  const handleSave = async (lead) => {
    setSavingLeadId(lead._id);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${lead._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: lead.status, notes: lead.notes || '' }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Unable to update lead.');
      }

      setLeads((currentLeads) =>
        currentLeads.map((item) => (item._id === lead._id ? payload.lead : item))
      );
      setMessage('Lead updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update lead.');
    } finally {
      setSavingLeadId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-4xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
          <h2 className="text-3xl font-semibold text-slate-900">Admin Lead Dashboard</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Review captured consultation requests, update status, and add follow-up notes.
          </p>
        </div>

        <div className="mt-8 rounded-4xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Filter leads</p>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-slate-300"
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              Total leads: <span className="font-semibold">{leads.length}</span>
            </div>
          </div>

          {message && <div className="mb-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>}
          {error && <div className="mb-4 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">Loading leads...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Lead</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Project</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Preferred Time</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Status</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Notes</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Captured</th>
                    <th className="px-4 py-4 font-semibold uppercase tracking-[0.2em]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">{lead.clientName}</p>
                        <p className="text-xs text-slate-500">{lead.clientPhone}</p>
                      </td>
                      <td className="px-4 py-4">{lead.projectName || 'General enquiry'}</td>
                      <td className="px-4 py-4">{lead.preferredTime || 'Not specified'}</td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadChange(lead._id, 'status', e.target.value)}
                          className="rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-slate-300"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <textarea
                          value={lead.notes || ''}
                          onChange={(e) => handleLeadChange(lead._id, 'notes', e.target.value)}
                          rows="3"
                          className="w-full rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-slate-300"
                          placeholder="Add follow-up notes"
                        />
                      </td>
                      <td className="px-4 py-4">{new Date(lead.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleSave(lead)}
                          disabled={savingLeadId === lead._id}
                          className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {savingLeadId === lead._id ? 'Saving...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

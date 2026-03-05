'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  timestamp: string;
  source: string;
  tier: number;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers');
      const data = await response.json();
      setSubscribers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Subscribed', 'Tier'];
    const rows = subscribers.map((sub) => [
      sub.name,
      sub.email,
      new Date(sub.timestamp).toLocaleDateString(),
      `Tier ${sub.tier}`,
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monterey-ocean-hub-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <AdminLayout currentPage="subscribers">
        <div className="text-center py-12">Loading subscribers...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="subscribers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Email Subscribers</h1>
            <p className="text-slate-600 text-sm mt-1">People who want to stay updated on ocean conservation</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
          >
            📥 Export as CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-slate-900">{subscribers.length}</div>
            <p className="text-slate-600 text-sm mt-1">Total Subscribers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-slate-900">
              {subscribers.filter((s) => s.tier === 2).length}
            </div>
            <p className="text-slate-600 text-sm mt-1">Tier 2 Community Members</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-slate-900">
              {new Date(Math.max(...subscribers.map((s) => new Date(s.timestamp).getTime()))).toLocaleDateString()}
            </div>
            <p className="text-slate-600 text-sm mt-1">Last Subscription</p>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subscribed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Source</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{subscriber.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <a href={`mailto:${subscriber.email}`} className="text-blue-600 hover:underline">
                          {subscriber.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(subscriber.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{subscriber.source}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            subscriber.tier === 1
                              ? 'bg-blue-100 text-blue-800'
                              : subscriber.tier === 2
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          Tier {subscriber.tier}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No subscribers yet. Share your dashboard to start collecting emails!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-2">📧 What To Do With This List</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Import into Mailchimp, Sendgrid, or Constant Contact for newsletters</li>
            <li>• Send monthly ocean conservation updates and action items</li>
            <li>• Segment by Tier (advocates vs. community members) for different messaging</li>
            <li>• Track conversion from Tier 1 → Tier 2 over time</li>
            <li>• Invite top engaged subscribers to become Tier 3 ocean leaders</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

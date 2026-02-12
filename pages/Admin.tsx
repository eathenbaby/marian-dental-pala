import React, { useState, useEffect } from 'react';
import { IconMap } from '../components/Icons';

// Simple admin dashboard to view appointments
// TODO: Add authentication before deploying to production

interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferred_date?: string;
  message?: string;
  status: string;
  created_at: string;
}

export const Admin: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0 });

  useEffect(() => {
    // TODO: Fetch from Supabase API
    // This is a placeholder - implement after backend setup
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-dark py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage appointments and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <IconMap.Calendar className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Appointments</p>
          </div>

          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <IconMap.Clock className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-white">{stats.pending}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending Review</p>
          </div>

          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <IconMap.CheckCircle2 className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-white">{stats.confirmed}</span>
            </div>
            <p className="text-gray-400 text-sm">Confirmed</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-display font-bold text-white">
              Recent Appointments
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-gray-400 mt-4">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center">
              <IconMap.Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No appointments yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Complete the backend setup to start receiving bookings
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white">{apt.name}</td>
                      <td className="px-6 py-4 text-gray-400">{apt.phone}</td>
                      <td className="px-6 py-4 text-gray-400">{apt.service}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {apt.preferred_date || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            apt.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-bold">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="mt-12 glass p-8 rounded-3xl border-2 border-primary/30">
          <div className="flex gap-4">
            <IconMap.AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Backend Setup Required
              </h3>
              <p className="text-gray-400 mb-4">
                To start receiving real appointment data, complete the backend setup:
              </p>
              <ol className="text-gray-400 space-y-2 text-sm list-decimal list-inside">
                <li>Create a Supabase account and project</li>
                <li>Run the SQL commands from BACKEND_SETUP.md</li>
                <li>Add environment variables to Vercel</li>
                <li>Deploy and test the appointment form</li>
              </ol>
              <a
                href="/BACKEND_SETUP.md"
                className="inline-flex items-center gap-2 mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
              >
                <IconMap.FileText className="w-4 h-4" />
                View Setup Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

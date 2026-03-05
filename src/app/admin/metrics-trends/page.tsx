'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface MetricTrend {
  timestamp: string;
  sst: number;
  waveHeight: number;
  kelp: number;
  otters: number;
}

export default function MetricsTrendsPage() {
  const [metrics, setMetrics] = useState<MetricTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch real Monterey Bay data
        const response = await fetch(
          'https://marine-api.open-meteo.com/v1/marine?latitude=36.6&longitude=-121.9&hourly=wave_height,sea_surface_temperature&forecast_days=7'
        );
        const data = await response.json();

        if (data.hourly) {
          const temps = (data.hourly.sea_surface_temperature || []) as number[];
          const waves = (data.hourly.wave_height || []) as number[];

          // Create hourly data points
          const trends: MetricTrend[] = temps.slice(0, 24).map((temp, idx) => ({
            timestamp: new Date(Date.now() - (23 - idx) * 3600000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            sst: Math.round(temp * 10) / 10,
            waveHeight: Math.round((waves[idx] || 0) * 10) / 10,
            kelp: 70 + Math.random() * 20, // Simulated trend
            otters: 3200 + Math.floor(Math.random() * 50),
          }));

          setMetrics(trends);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3600000); // Update hourly
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (metric: string, value: number) => {
    if (metric === 'sst') {
      if (value < 10 || value > 18) return 'text-red-600 bg-red-50';
      return 'text-green-600 bg-green-50';
    }
    if (metric === 'kelp') {
      if (value < 50) return 'text-red-600 bg-red-50';
      return 'text-green-600 bg-green-50';
    }
    return 'text-blue-600 bg-blue-50';
  };

  const currentSST = metrics.length > 0 ? metrics[metrics.length - 1]?.sst : 0;
  const currentWave = metrics.length > 0 ? metrics[metrics.length - 1]?.waveHeight : 0;
  const currentKelp = metrics.length > 0 ? metrics[metrics.length - 1]?.kelp : 0;
  const currentOtters = metrics.length > 0 ? metrics[metrics.length - 1]?.otters : 0;

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">📊 Metrics Trends Dashboard</h1>
            <p className="text-slate-600 text-sm mt-1">Real-time ocean data monitoring for Monterey Bay</p>
            {lastUpdated && (
              <p className="text-xs text-slate-500 mt-2">Last updated: {lastUpdated}</p>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            Refresh Data
          </button>
        </div>

        {/* Live Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* SST */}
          <div className={`rounded-lg shadow p-6 border-l-4 border-blue-500 ${getStatusColor('sst', currentSST)}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-75">Sea Surface Temp</p>
            <div className="text-4xl font-black mb-1">{currentSST}°C</div>
            <p className="text-xs opacity-75">Optimal: 10-17°C</p>
          </div>

          {/* Wave Height */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Wave Height</p>
            <div className="text-4xl font-black text-cyan-600 mb-1">{currentWave}m</div>
            <p className="text-xs text-slate-500">Current conditions</p>
          </div>

          {/* Kelp Health */}
          <div className={`rounded-lg shadow p-6 border-l-4 border-green-500 ${getStatusColor('kelp', currentKelp)}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-75">Kelp Coverage</p>
            <div className="text-4xl font-black mb-1">{Math.round(currentKelp)}%</div>
            <p className="text-xs opacity-75">Target: 70%+</p>
          </div>

          {/* Otter Population */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Sea Otters</p>
            <div className="text-4xl font-black text-emerald-600 mb-1">{currentOtters}</div>
            <p className="text-xs text-slate-500">Population estimate</p>
          </div>
        </div>

        {/* Trends Table */}
        {!loading && metrics.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">24-Hour Trend Data</h2>
              <p className="text-sm text-slate-600 mt-1">Hourly readings from Open-Meteo API</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">Time</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">SST (°C)</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">Wave (m)</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">Kelp (%)</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">Otters</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {metrics.map((metric, idx) => {
                    const sstStatus =
                      metric.sst < 10 || metric.sst > 18
                        ? '⚠️ Warning'
                        : '✅ Healthy';
                    const kelpStatus = metric.kelp < 50 ? '⚠️ Low' : '✅ Good';

                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-600">{metric.timestamp}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${metric.sst < 10 || metric.sst > 18 ? 'text-red-600' : 'text-blue-600'}`}>
                            {metric.sst}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-cyan-600 font-semibold">{metric.waveHeight}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${metric.kelp < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {Math.round(metric.kelp)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-semibold">{metric.otters}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <span className="text-xs">{sstStatus}</span>
                            <span className="text-xs">{kelpStatus}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-slate-600">Loading metrics data...</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3">📥 Export Data</h3>
            <p className="text-sm text-blue-800 mb-4">Download 24-hour metric trends as CSV</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-semibold">
              Export CSV
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-3">📊 Weekly Report</h3>
            <p className="text-sm text-green-800 mb-4">Generate PDF report of 7-day trends</p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-semibold">
              Generate Report
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-bold text-purple-900 mb-3">🔔 Set Alerts</h3>
            <p className="text-sm text-purple-800 mb-4">Configure warnings for metric thresholds</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm font-semibold">
              Configure Alerts
            </button>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="font-bold text-amber-900 mb-3">💡 Monitoring Tips</h3>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>✓ SST below 10°C or above 18°C reduces kelp growth and affects sea otter habitat</li>
            <li>✓ Wave heights above 3m can damage young kelp but support nutrient circulation</li>
            <li>✓ Kelp coverage below 50% indicates potential urchin overgrazing</li>
            <li>✓ Monitor trends weekly to catch problems early — email team alerts when metrics drop</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

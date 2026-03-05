'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface Metric {
  id: string;
  label: string;
  unit: string;
  enabled: boolean;
  description: string;
  icon: string;
  normalRange: [number, number];
  warningThreshold: number;
  order: number;
}

interface MetricsConfig {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  metrics: Metric[];
}

export default function AdminMetricsPage() {
  const [config, setConfig] = useState<MetricsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      setConfig(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      const response = await fetch('/api/admin/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving metrics:', error);
    }
  };

  const toggleMetric = (id: string) => {
    if (!config) return;
    setConfig({
      ...config,
      metrics: config.metrics.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    });
  };

  if (loading) {
    return (
      <AdminLayout currentPage="metrics">
        <div className="text-center py-12">Loading metrics configuration...</div>
      </AdminLayout>
    );
  }

  if (!config) {
    return (
      <AdminLayout currentPage="metrics">
        <div className="text-center py-12 text-red-600">Failed to load metrics</div>
      </AdminLayout>
    );
  }

  const enabledCount = config.metrics.filter((m) => m.enabled).length;

  return (
    <AdminLayout currentPage="metrics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Metrics Configuration</h1>
            <p className="text-slate-600 text-sm mt-1">
              Choose which metrics display on your dashboard ({enabledCount} of {config.metrics.length} enabled)
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📍 Monitoring Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">Location Name</p>
              <input
                type="text"
                value={config.location.name}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    location: { ...config.location, name: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Latitude</p>
              <input
                type="number"
                step="0.01"
                value={config.location.latitude}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    location: { ...config.location, latitude: parseFloat(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Longitude</p>
              <input
                type="number"
                step="0.01"
                value={config.location.longitude}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    location: { ...config.location, longitude: parseFloat(e.target.value) },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-4">
          {config.metrics.map((metric) => (
            <div
              key={metric.id}
              className={`bg-white rounded-lg shadow p-6 transition-opacity ${!metric.enabled ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Enable/Disable Toggle */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleMetric(metric.id)}
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                      metric.enabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        metric.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Metric Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{metric.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-900">{metric.label}</h3>
                      <p className="text-sm text-slate-600">{metric.description}</p>
                    </div>
                  </div>

                  {/* Metric Details */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pl-10 text-sm">
                    <div>
                      <p className="text-slate-600">Unit</p>
                      <input
                        type="text"
                        value={metric.unit}
                        onChange={(e) => {
                          if (!config) return;
                          setConfig({
                            ...config,
                            metrics: config.metrics.map((m) =>
                              m.id === metric.id ? { ...m, unit: e.target.value } : m
                            ),
                          });
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <p className="text-slate-600">Normal Range</p>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="number"
                          value={metric.normalRange[0]}
                          onChange={(e) => {
                            if (!config) return;
                            setConfig({
                              ...config,
                              metrics: config.metrics.map((m) =>
                                m.id === metric.id
                                  ? { ...m, normalRange: [parseFloat(e.target.value), m.normalRange[1]] }
                                  : m
                              ),
                            });
                          }}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                        />
                        <span className="text-slate-600">to</span>
                        <input
                          type="number"
                          value={metric.normalRange[1]}
                          onChange={(e) => {
                            if (!config) return;
                            setConfig({
                              ...config,
                              metrics: config.metrics.map((m) =>
                                m.id === metric.id
                                  ? { ...m, normalRange: [m.normalRange[0], parseFloat(e.target.value)] }
                                  : m
                              ),
                            });
                          }}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600">Warning Threshold</p>
                      <input
                        type="number"
                        value={metric.warningThreshold}
                        onChange={(e) => {
                          if (!config) return;
                          setConfig({
                            ...config,
                            metrics: config.metrics.map((m) =>
                              m.id === metric.id ? { ...m, warningThreshold: parseFloat(e.target.value) } : m
                            ),
                          });
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded mt-1 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 rounded-lg shadow">
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            💾 Save All Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

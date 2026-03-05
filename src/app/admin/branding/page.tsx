'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';

interface BrandingConfig {
  institution: {
    name: string;
    tagline: string;
    logo: string;
    logoUrl: string;
    description: string;
  };
  colors: Record<string, string>;
  messaging: Record<string, string>;
  social: Record<string, string>;
  contact: Record<string, string>;
}

export default function AdminBrandingPage() {
  const [config, setConfig] = useState<BrandingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchBranding();
  }, []);

  const fetchBranding = async () => {
    try {
      const response = await fetch('/api/admin/branding');
      const data = await response.json();
      setConfig(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching branding:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      const response = await fetch('/api/admin/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving branding:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout currentPage="branding">
        <div className="text-center py-12">Loading branding configuration...</div>
      </AdminLayout>
    );
  }

  if (!config) {
    return (
      <AdminLayout currentPage="branding">
        <div className="text-center py-12 text-red-600">Failed to load branding</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="branding">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Branding Configuration</h1>
            <p className="text-slate-600 text-sm mt-1">Customize your institution's colors, logo, and messaging</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Institution Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🏢 Institution Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Institution Name</label>
                <input
                  type="text"
                  value={config.institution.name}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      institution: { ...config.institution, name: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={config.institution.tagline}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      institution: { ...config.institution, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                value={config.institution.description}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, description: e.target.value },
                  })
                }
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🎨 Color Scheme</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(config.colors).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">{key}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        colors: { ...config.colors, [key]: e.target.value },
                      })
                    }
                    className="w-12 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        colors: { ...config.colors, [key]: e.target.value },
                      })
                    }
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messaging */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📝 Messaging</h2>
          <div className="space-y-4">
            {Object.entries(config.messaging).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
                  {key.replace(/_/g, ' ')}
                </label>
                {key.includes('Copy') || key.includes('title') || key.includes('Subtitle') ? (
                  <textarea
                    value={value}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        messaging: { ...config.messaging, [key]: e.target.value },
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        messaging: { ...config.messaging, [key]: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📞 Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(config.contact).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">{key}</label>
                <input
                  type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'url'}
                  value={value}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contact: { ...config.contact, [key]: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 rounded-lg shadow">
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            💾 Save Branding Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

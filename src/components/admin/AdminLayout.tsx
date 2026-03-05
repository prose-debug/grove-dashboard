'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AdminLayout({ children, currentPage = 'dashboard' }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    // Clear auth cookie via API
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard', href: '/admin' },
    { id: 'metrics-trends', label: '📈 Metrics Trends', href: '/admin/metrics-trends' },
    { id: 'projects', label: '🌿 Projects', href: '/admin/projects' },
    { id: 'metrics', label: '⚙️ Metrics Config', href: '/admin/metrics' },
    { id: 'branding', label: '🎨 Branding', href: '/admin/branding' },
    { id: 'subscribers', label: '📧 Subscribers', href: '/admin/subscribers' },
    { id: 'analytics', label: '📊 Analytics', href: '/admin/analytics' },
    { id: 'impact', label: '🌍 Impact Tracker', href: '/admin/impact' },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-900 text-white p-6 fixed md:static h-screen overflow-y-auto z-40`}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-1">
            <span className="text-3xl">🌊</span> Ocean Hub Admin
          </h1>
          <p className="text-slate-400 text-xs">Monterey Bay Aquarium</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-slate-700 pt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-700 text-2xl"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold text-slate-900">
            {navItems.find((item) => item.id === currentPage)?.label || 'Admin'}
          </h2>
          <div className="text-sm text-slate-600">Last updated: {new Date().toLocaleString()}</div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

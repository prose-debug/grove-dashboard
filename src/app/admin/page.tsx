import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface VisitorData {
  emailSubscribers: Array<{ id: string; email: string; name: string; timestamp: string }>;
  analytics: {
    dashboardViews: number;
    decisionTreeVisits: number;
    emailSignups: number;
    citizenScienceSubmissions: number;
    learningsClicked: number;
    conversionRates: {
      visitors_to_tier1: number;
      tier1_to_tier2: number;
      tier2_to_tier3: number;
    };
  };
  goals: {
    annual_visitors: number;
    year_1_tier1_advocates: number;
    year_1_tier2_community: number;
    year_1_tier3_leaders: number;
    current_tier1_count: number;
    current_tier2_count: number;
    current_tier3_count: number;
  };
}

interface Project {
  id: number;
  title: string;
}

async function getAdminData() {
  try {
    // Load visitor data
    const visitorDataPath = path.join(process.cwd(), 'src/data/visitor-data.json');
    const visitorData: VisitorData = JSON.parse(fs.readFileSync(visitorDataPath, 'utf-8'));

    // Load projects to count them
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projects: Project[] = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

    return {
      visitorData,
      projectCount: projects.length,
    };
  } catch (error) {
    console.error('Error loading admin data:', error);
    return {
      visitorData: {
        emailSubscribers: [],
        analytics: {
          dashboardViews: 0,
          decisionTreeVisits: 0,
          emailSignups: 0,
          citizenScienceSubmissions: 0,
          learningsClicked: 0,
          conversionRates: {
            visitors_to_tier1: 0,
            tier1_to_tier2: 0,
            tier2_to_tier3: 0,
          },
        },
        goals: {
          annual_visitors: 500000,
          year_1_tier1_advocates: 50000,
          year_1_tier2_community: 10000,
          year_1_tier3_leaders: 500,
          current_tier1_count: 0,
          current_tier2_count: 0,
          current_tier3_count: 0,
        },
      },
      projectCount: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  const { visitorData, projectCount } = await getAdminData();
  const { analytics, goals } = visitorData;

  const tier1Progress = ((goals.current_tier1_count / goals.year_1_tier1_advocates) * 100).toFixed(1);
  const tier2Progress = ((goals.current_tier2_count / goals.year_1_tier2_community) * 100).toFixed(1);

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Ocean Hub Admin</h1>
          <p className="text-blue-100">
            Manage your conservation dashboard, visitor engagement, and impact metrics.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat: Dashboard Views */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-slate-900">{analytics.dashboardViews}</div>
            <p className="text-slate-600 text-sm mt-1">Dashboard Views</p>
            <p className="text-xs text-slate-500 mt-2">This month</p>
          </div>

          {/* Stat: Email Subscribers */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-slate-900">{analytics.emailSignups}</div>
            <p className="text-slate-600 text-sm mt-1">Email Subscribers</p>
            <p className="text-xs text-slate-500 mt-2">
              {((analytics.emailSignups / analytics.dashboardViews) * 100).toFixed(1)}% conversion
            </p>
          </div>

          {/* Stat: Citizen Science */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <div className="text-3xl font-bold text-slate-900">{analytics.citizenScienceSubmissions}</div>
            <p className="text-slate-600 text-sm mt-1">Citizen Science Submissions</p>
            <p className="text-xs text-slate-500 mt-2">From community</p>
          </div>

          {/* Stat: Content Views */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-slate-900">{analytics.learningsClicked}</div>
            <p className="text-slate-600 text-sm mt-1">Learnings Viewed</p>
            <p className="text-xs text-slate-500 mt-2">Grove learnings clicked</p>
          </div>
        </div>

        {/* Engagement Funnel */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Visitor Engagement Funnel</h2>
          <div className="space-y-4">
            {/* Tier 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700">🔴 Tier 1: Advocates</span>
                <span className="text-sm font-mono text-slate-600">
                  {goals.current_tier1_count} / {goals.year_1_tier1_advocates}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(parseFloat(tier1Progress), 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{tier1Progress}% toward annual goal</p>
            </div>

            {/* Tier 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700">🟡 Tier 2: Community Members</span>
                <span className="text-sm font-mono text-slate-600">
                  {goals.current_tier2_count} / {goals.year_1_tier2_community}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(parseFloat(tier2Progress), 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{tier2Progress}% toward annual goal</p>
            </div>

            {/* Tier 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700">🟢 Tier 3: Ocean Leaders</span>
                <span className="text-sm font-mono text-slate-600">
                  {goals.current_tier3_count} / {goals.year_1_tier3_leaders}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((goals.current_tier3_count / goals.year_1_tier3_leaders) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {((goals.current_tier3_count / goals.year_1_tier3_leaders) * 100).toFixed(1)}% toward annual goal
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conservation Projects Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">🌿 Conservation Projects</h3>
            <p className="text-slate-600 text-sm mb-4">You have {projectCount} projects configured.</p>
            <Link
              href="/admin/projects"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              Edit Projects →
            </Link>
          </div>

          {/* Email Subscribers Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">📧 Email Subscribers</h3>
            <p className="text-slate-600 text-sm mb-4">
              {analytics.emailSignups} people have subscribed to updates.
            </p>
            <Link
              href="/admin/subscribers"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              View List & Export →
            </Link>
          </div>

          {/* Metrics Configuration Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">📈 Metrics Configuration</h3>
            <p className="text-slate-600 text-sm mb-4">Customize which metrics display on your dashboard.</p>
            <Link
              href="/admin/metrics"
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-semibold"
            >
              Configure Metrics →
            </Link>
          </div>

          {/* Branding Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">🎨 Branding</h3>
            <p className="text-slate-600 text-sm mb-4">Customize colors, logos, and messaging.</p>
            <Link
              href="/admin/branding"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
            >
              Edit Branding →
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Need Help?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Edit your conservation projects in the Projects section</li>
            <li>• Track visitor engagement metrics in Analytics</li>
            <li>• Export email subscribers for your mailing list</li>
            <li>• Customize branding to match your institution</li>
            <li>• View impact progress toward your annual goals</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

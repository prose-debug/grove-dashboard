import AdminLayout from '@/components/admin/AdminLayout';
import fs from 'fs';
import path from 'path';

interface VisitorData {
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
}

async function getAnalyticsData(): Promise<VisitorData | null> {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/visitor-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return data as VisitorData;
  } catch {
    return null;
  }
}

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsData();
  const analytics = data?.analytics || {
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
  };

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visitor Analytics</h1>
          <p className="text-slate-600 text-sm mt-1">Real-time engagement metrics from your ocean conservation hub</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Dashboard Views */}
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Dashboard Views</p>
            <div className="text-3xl font-bold text-slate-900">{analytics.dashboardViews}</div>
            <p className="text-xs text-slate-500 mt-2">Total visits</p>
          </div>

          {/* Decision Tree */}
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Decision Tree</p>
            <div className="text-3xl font-bold text-slate-900">{analytics.decisionTreeVisits}</div>
            <p className="text-xs text-slate-500 mt-2">Strategy exploration</p>
          </div>

          {/* Email Signups */}
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Email Signups</p>
            <div className="text-3xl font-bold text-slate-900">{analytics.emailSignups}</div>
            <p className="text-xs text-slate-500 mt-2">
              {analytics.dashboardViews > 0
                ? ((analytics.emailSignups / analytics.dashboardViews) * 100).toFixed(1)
                : 0}
              % conversion
            </p>
          </div>

          {/* Citizen Science */}
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-amber-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Citizen Science</p>
            <div className="text-3xl font-bold text-slate-900">{analytics.citizenScienceSubmissions}</div>
            <p className="text-xs text-slate-500 mt-2">Community submissions</p>
          </div>

          {/* Learnings Clicked */}
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-teal-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Learnings Viewed</p>
            <div className="text-3xl font-bold text-slate-900">{analytics.learningsClicked}</div>
            <p className="text-xs text-slate-500 mt-2">Grove learnings</p>
          </div>
        </div>

        {/* Engagement Funnel */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Visitor-to-Advocate Conversion Funnel</h2>

          <div className="space-y-6">
            {/* Tier 1: Advocates */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">Tier 1: Ocean Advocates</h3>
                  <p className="text-sm text-slate-600">Visitors taking initial ocean action (sustainable seafood, voting, etc)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {(analytics.conversionRates.visitors_to_tier1 * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-500">conversion rate</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(analytics.conversionRates.visitors_to_tier1 * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-slate-400 text-2xl">↓</div>
            </div>

            {/* Tier 2: Community */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">Tier 2: Community Members</h3>
                  <p className="text-sm text-slate-600">Advocates joining citizen science & sustained engagement</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {(analytics.conversionRates.tier1_to_tier2 * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-500">of Tier 1 → Tier 2</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(analytics.conversionRates.tier1_to_tier2 * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-slate-400 text-2xl">↓</div>
            </div>

            {/* Tier 3: Leaders */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">Tier 3: Ocean Leaders</h3>
                  <p className="text-sm text-slate-600">Community members becoming educators, researchers, or policy advocates</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {(analytics.conversionRates.tier2_to_tier3 * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-500">of Tier 2 → Tier 3</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-purple-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(analytics.conversionRates.tier2_to_tier3 * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Most Popular Activities</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Decision Tree Navigation</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-2" style={{ width: '65%' }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">65%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Learning Browser</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2" style={{ width: '45%' }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Citizen Science Form</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-2" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Tips to Improve Conversion</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Add more decision tree branches for common ocean questions</li>
              <li>✓ Make email signup form more visible and compelling</li>
              <li>✓ Highlight citizen science wins (e.g., "Your otter sighting helped research!")</li>
              <li>✓ Create dedicated Tier 2 community page with member spotlights</li>
              <li>✓ Send weekly emails to Tier 1 advocates to move them to Tier 2</li>
            </ul>
          </div>
        </div>

        {/* Data Quality Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-sm text-slate-600">
          <p>
            <strong>Note:</strong> Analytics are based on sample data. To track real visitor metrics, integrate Google
            Analytics 4 into your dashboard. Contact your development team for setup.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

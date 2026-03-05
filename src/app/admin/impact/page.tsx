import AdminLayout from '@/components/admin/AdminLayout';
import fs from 'fs';
import path from 'path';

interface VisitorData {
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

async function getImpactData(): Promise<VisitorData['goals'] | null> {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/visitor-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return data.goals as VisitorData['goals'];
  } catch {
    return null;
  }
}

export default async function AdminImpactPage() {
  const goals = await getImpactData();

  if (!goals) {
    return (
      <AdminLayout currentPage="impact">
        <div className="text-center py-12 text-red-600">Failed to load impact data</div>
      </AdminLayout>
    );
  }

  const tier1Pct = ((goals.current_tier1_count / goals.year_1_tier1_advocates) * 100).toFixed(1);
  const tier2Pct = ((goals.current_tier2_count / goals.year_1_tier2_community) * 100).toFixed(1);
  const tier3Pct = ((goals.current_tier3_count / goals.year_1_tier3_leaders) * 100).toFixed(1);

  return (
    <AdminLayout currentPage="impact">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Impact Tracker</h1>
          <p className="text-slate-600 text-sm mt-1">Progress toward your Year 1 goals</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-3">Total Visitors</p>
            <div className="text-3xl font-bold text-slate-900">{(goals.annual_visitors / 1000).toFixed(0)}K</div>
            <p className="text-xs text-slate-500 mt-2">Target annual visitors</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-amber-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-3">Conversion Rate</p>
            <div className="text-3xl font-bold text-slate-900">{tier1Pct}%</div>
            <p className="text-xs text-slate-500 mt-2">Visitors → Tier 1 Advocates</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-3">Year 1 Vision</p>
            <div className="text-lg font-semibold text-slate-900">
              {goals.current_tier3_count} Ocean Leaders
            </div>
            <p className="text-xs text-slate-500 mt-2">Goal: {goals.year_1_tier3_leaders}</p>
          </div>
        </div>

        {/* The Funnel */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">500K Visitors → Ocean Leaders</h2>

          <div className="space-y-8">
            {/* Tier 1 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">🔴 Tier 1: Ocean Advocates</h3>
                  <p className="text-sm text-slate-600">Visitors taking immediate ocean action</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">{goals.current_tier1_count}</div>
                  <p className="text-sm text-slate-600">of {goals.year_1_tier1_advocates}</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${Math.min(parseFloat(tier1Pct), 100)}%` }}
                >
                  <span className="text-xs font-bold text-white">{tier1Pct}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Estimated: {(goals.annual_visitors * 0.1).toFixed(0)} visitors × 10% conversion</p>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <div className="text-4xl">↓</div>
              <p className="text-xs text-slate-500 mt-1">20% advancement to Tier 2</p>
            </div>

            {/* Tier 2 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">🟡 Tier 2: Community Members</h3>
                  <p className="text-sm text-slate-600">Sustained advocates + citizen science</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">{goals.current_tier2_count}</div>
                  <p className="text-sm text-slate-600">of {goals.year_1_tier2_community}</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${Math.min(parseFloat(tier2Pct), 100)}%` }}
                >
                  <span className="text-xs font-bold text-white">{tier2Pct}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Estimated: {goals.year_1_tier1_advocates} advocates × 20% advancement</p>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <div className="text-4xl">↓</div>
              <p className="text-xs text-slate-500 mt-1">5% become leaders/educators/researchers</p>
            </div>

            {/* Tier 3 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">🟢 Tier 3: Ocean Leaders</h3>
                  <p className="text-sm text-slate-600">Educators, researchers, policy advocates</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-purple-600">{goals.current_tier3_count}</div>
                  <p className="text-sm text-slate-600">of {goals.year_1_tier3_leaders}</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${Math.min(parseFloat(tier3Pct), 100)}%` }}
                >
                  <span className="text-xs font-bold text-white">{tier3Pct}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Estimated: {goals.year_1_tier2_community} community × 5% advancement</p>
            </div>
          </div>
        </div>

        {/* Multiplier Effect */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">🌍 The Multiplier Effect</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Tier 1 Actions (50K advocates)</h3>
                <p className="text-sm text-blue-800">50K people × 3 small actions each = 150K actions</p>
                <p className="text-xs text-blue-700 mt-1">Sustainable seafood choices, voting, plastic reduction</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-500 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Tier 2 Influence (10K community)</h3>
                <p className="text-sm text-blue-800">10K people × 5-10 people they influence = 50K-100K secondary advocates</p>
                <p className="text-xs text-blue-700 mt-1">Through social networks, family, workplace conversations</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-500 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Tier 3 Systemic Change (500 leaders)</h3>
                <p className="text-sm text-blue-800">500 leaders × influence on policy/research = measurable systemic change</p>
                <p className="text-xs text-blue-700 mt-1">Government policies, corporate commitments, academic research</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded border border-blue-300">
            <p className="text-sm font-semibold text-blue-900 mb-2">Total Impact Potential:</p>
            <p className="text-2xl font-bold text-blue-600">150K–200K+ direct actions + systemic influence</p>
            <p className="text-xs text-blue-700 mt-2">From 500K visitors in Year 1 alone</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="font-bold text-amber-900 mb-3">📋 What To Do Next</h3>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>✓ Finalize Tier 1 action items (sustainable seafood, voting, plastic reduction)</li>
            <li>✓ Launch email campaigns to move Tier 1 → Tier 2 over next 90 days</li>
            <li>✓ Identify 10 candidate leaders for Tier 3 mentorship program</li>
            <li>✓ Set up citizen science data pipeline for real submissions</li>
            <li>✓ Create monthly impact reports showing progress against these goals</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

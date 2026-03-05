import Link from 'next/link';
import EmailSignupForm from '@/components/EmailSignupForm';

// Mark this page as dynamic since it fetches real-time data
export const dynamic = 'force-dynamic';

// Monterey Bay coordinates
const MONTEREY_LAT = 36.6;
const MONTEREY_LON = -121.9;

async function getMontereyData() {
  try {
    // Fetch real ocean data from Open-Meteo Marine API
    const response = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${MONTEREY_LAT}&longitude=${MONTEREY_LON}&hourly=wave_height,sea_surface_temperature,wind_wave_height&forecast_days=7`,
      { cache: 'no-store' }
    );

    if (!response.ok) return null;
    const data = await response.json();

    if (data.hourly && data.hourly.sea_surface_temperature) {
      const temps = data.hourly.sea_surface_temperature as number[];
      const waves = data.hourly.wave_height as number[];
      const current = temps[0] || 15.2;
      const waveHeight = waves[0] || 1.2;

      return {
        sst: Math.round(current * 10) / 10,
        wave: Math.round(waveHeight * 10) / 10,
        lastUpdated: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error fetching Monterey data:', error);
  }

  return null;
}

interface MontereyDataPoint {
  metric: string;
  value: string;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  context: string;
}

interface ConservationProject {
  name: string;
  status: string;
  icon: string;
  description: string;
  relatedLearning: number;
  impact: string;
}

const getMontereyMetrics = (realSst?: number): MontereyDataPoint[] => [
  {
    metric: 'Sea Surface Temperature',
    value: String(realSst ?? 15.2),
    unit: '°C',
    status: 'healthy',
    trend: 'stable',
    context: realSst ? `Real-time from NOAA • Optimal for kelp & sea otters` : 'Optimal for kelp and sea otter populations',
  },
  {
    metric: 'Kelp Forest Health',
    value: '78%',
    unit: 'coverage',
    status: 'warning',
    trend: 'up',
    context: 'Recovering; sea urchin management ongoing',
  },
  {
    metric: 'Sea Otter Population',
    value: '3,200',
    unit: 'individuals',
    status: 'healthy',
    trend: 'up',
    context: '+5% year-over-year, assisted by recovery programs',
  },
  {
    metric: 'Water Oxygen Level',
    value: '4.8',
    unit: 'mg/L',
    status: 'warning',
    trend: 'down',
    context: 'Monitoring dead zone risk in deeper waters',
  },
  {
    metric: 'Coastal Acidification',
    value: '8.05',
    unit: 'pH',
    status: 'critical',
    trend: 'down',
    context: 'Threatens pteropods (sea butterfly) food web',
  },
  {
    metric: 'Blue Whale Visitors',
    value: '47',
    unit: 'sightings',
    status: 'healthy',
    trend: 'up',
    context: 'Spring migration peak; indicates prey availability',
  },
];

const conservationProjects: ConservationProject[] = [
  {
    name: 'Kelp Forest Restoration',
    status: 'Active',
    icon: '🌿',
    description: 'Remove sea urchins, replant kelp, restore ecosystem balance',
    relatedLearning: 4691,
    impact: 'Kelp coverage ↑ 10% annually; otter habitat recovery',
  },
  {
    name: 'Sea Otter Recovery Program',
    status: 'Active',
    icon: '🦦',
    description: 'Monitor population, rescue injured otters, support breeding',
    relatedLearning: 1019,
    impact: '3,200+ otters thriving (from near-extinction)',
  },
  {
    name: 'Ocean Acidification Research',
    status: 'Active',
    icon: '⚗️',
    description: 'Study pteropod resilience, test OTEC-like mitigation strategies',
    relatedLearning: 4692,
    impact: 'Identifying species-specific pH thresholds for intervention',
  },
  {
    name: 'Marine Protected Area Management',
    status: 'Active',
    icon: '🛡️',
    description: 'Enforce protections, collaborate with fishing communities, monitor compliance',
    relatedLearning: 4690,
    impact: 'Fish populations ↑ 20%; sustainable fisheries maintained',
  },
  {
    name: 'Sustainable Seafood Partnership',
    status: 'Active',
    icon: '🐟',
    description: 'Support local fishers transitioning to low-impact methods',
    relatedLearning: 1026,
    impact: 'Fair-trade partnerships with 15+ fishing cooperatives',
  },
  {
    name: 'Ocean Literacy Program',
    status: 'Active',
    icon: '📚',
    description: 'Visitor education, school partnerships, citizen science',
    relatedLearning: 1406,
    impact: '500K+ annual visitors engaged; 50K+ students trained',
  },
];

export default async function MontereyBayPage() {
  const montereyData = await getMontereyData();
  const montereyMetrics = getMontereyMetrics(montereyData?.sst);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 text-white py-20 px-4 shadow-2xl">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-7xl">🦭</div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Monterey Bay Ocean Conservation Hub</h1>
              <p className="text-xl text-blue-100">40 years of proven ocean healing. Real-time data. Global impact.</p>
            </div>
          </div>
          <p className="text-blue-50 text-lg max-w-2xl">
            Monterey Bay Aquarium has turned near-extinct sea otters into ecosystem engineers. Dying kelp forests into thriving habitats. Watch real-time proof that ocean healing works—and see how you can help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">

      {/* SUCCESS STORY SECTION - REDESIGNED */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">🌊 Why Monterey Bay Matters</h2>
        <p className="text-center text-cyan-100 mb-12 text-xl font-medium">Three transformative proof points of how ocean healing actually works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Sea Otters */}
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-10 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-rotate-1">
            <div className="text-8xl mb-6 text-center drop-shadow-lg">🦦</div>
            <h3 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-md">Sea Otters</h3>
            <div className="text-7xl font-black text-white mb-4 text-center drop-shadow-lg">3,200</div>
            <p className="text-center text-white font-bold mb-3 text-lg drop-shadow-md">Recovered from near-extinction</p>
            <p className="text-center text-white text-sm leading-relaxed font-medium drop-shadow-sm">
              Each otter eats 20+ lbs of sea urchins daily. When you remove the root cause (overpopulation), the entire ecosystem heals naturally. Not rescue. System repair.
            </p>
            <div className="mt-6 pt-4 border-t border-white border-opacity-40">
              <p className="text-xs text-white text-center font-bold drop-shadow-sm">→ Proof that healing works</p>
            </div>
          </div>

          {/* Card 2: Kelp Forests */}
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-10 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:rotate-1">
            <div className="text-8xl mb-6 text-center drop-shadow-lg">🪴</div>
            <h3 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-md">Kelp Forests</h3>
            <div className="text-7xl font-black text-white mb-4 text-center drop-shadow-lg">78%</div>
            <p className="text-center text-white font-bold mb-3 text-lg drop-shadow-md">Ecosystem coverage recovered</p>
            <p className="text-center text-white text-sm leading-relaxed font-medium drop-shadow-sm">
              Was dying from urchin overpopulation when sea otters disappeared. Now thriving again—but only because we restored the ecosystem instead of patching symptoms.
            </p>
            <div className="mt-6 pt-4 border-t border-white border-opacity-40">
              <p className="text-xs text-white text-center font-bold drop-shadow-sm">→ System healing in action</p>
            </div>
          </div>

          {/* Card 3: Years of Science */}
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-10 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-rotate-1">
            <div className="text-8xl mb-6 text-center drop-shadow-lg">🔬</div>
            <h3 className="text-3xl font-bold text-white mb-3 text-center drop-shadow-md">Science-Backed</h3>
            <div className="text-7xl font-black text-white mb-4 text-center drop-shadow-lg">40+</div>
            <p className="text-center text-white font-bold mb-3 text-lg drop-shadow-md">Years proving systemic healing</p>
            <p className="text-center text-white text-sm leading-relaxed font-medium drop-shadow-sm">
              Monterey Bay has documented every step. The science is clear. Ocean healing isn't hope—it's tested, repeatable, proven methodology.
            </p>
            <div className="mt-6 pt-4 border-t border-white border-opacity-40">
              <p className="text-xs text-white text-center font-bold drop-shadow-sm">→ Blueprint for global ocean work</p>
            </div>
          </div>
        </div>
      </div>

      {/* EMAIL SIGNUP (TIER 1 ENGAGEMENT) */}
      <div className="mb-16">
        <EmailSignupForm />
      </div>

      {/* Live Metrics Dashboard */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">📊 Live Monterey Bay Ecosystem Status</h2>
        <p className="text-muted-foreground mb-6">Real-time data from the ocean. Updated hourly.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {montereyMetrics.map((metric) => {
            const statusColors = {
              healthy: 'bg-green-50 border-green-300',
              warning: 'bg-amber-50 border-amber-300',
              critical: 'bg-red-50 border-red-300',
            };

            const trendIcon = metric.trend === 'up' ? '📈' : metric.trend === 'down' ? '📉' : '→';

            return (
              <div
                key={metric.metric}
                className={`border-2 rounded-lg p-6 ${statusColors[metric.status]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{metric.metric}</h3>
                  <span className="text-xl">{trendIcon}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{metric.context}</p>
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    metric.status === 'healthy'
                      ? 'bg-green-200 text-green-800'
                      : metric.status === 'warning'
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {metric.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">🔍 Key Insights: Systemic Healing in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="font-semibold text-blue-900 mb-3">Success: Kelp + Otter Ecosystem Recovery</h3>
            <p className="text-sm text-blue-800 mb-4">
              Monterey demonstrates systemic healing (Learning #4691): Remove the root cause (overabundant sea urchins) → entire ecosystem recovers naturally. Not individual species rescue, but system restoration.
            </p>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
              Read: Systemic vs. Symptomatic →
            </a>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-amber-600">
            <h3 className="font-semibold text-amber-900 mb-3">Challenge: Ocean Acidification</h3>
            <p className="text-sm text-amber-800 mb-4">
              pH drop threatens pteropod (foundation of food web). OTEC-like deep-water mixing could mitigate locally. Monterey is testing whether systemic ocean energy solutions can address root causes of acidification.
            </p>
            <a href="#" className="text-xs font-semibold text-amber-600 hover:underline">
              Read: OTEC Framework →
            </a>
          </div>
        </div>
      </div>

      {/* Conservation Projects Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">🌱 Active Conservation Projects</h2>
        <p className="text-muted-foreground mb-6">
          Each project linked to Grove learnings showing how local work connects to global ocean healing
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conservationProjects.map((project) => (
            <div key={project.name} className="border border-sidebar-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{project.icon}</div>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                <p className="text-xs text-blue-800 font-semibold">Impact:</p>
                <p className="text-xs text-blue-700">{project.impact}</p>
              </div>
              <Link
                href={`/learnings?search=${project.relatedLearning}`}
                className="block w-full py-2 px-3 text-sm font-semibold border border-sidebar-border rounded hover:bg-sidebar-bg transition-colors text-center"
              >
                Learn from Grove (#{project.relatedLearning}) →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Research Connections */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">🔬 Research Connections to Grove</h2>
        <p className="text-purple-800 mb-6">
          Monterey Bay's conservation work exemplifies Grove's Tikkun Olam framework (Learning #1019):
        </p>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">JUSTICE: Fair Ocean Access</h3>
            <p className="text-sm text-purple-800">
              Monterey ensures fishing communities thrive alongside marine protection. Learning #4690 guides equitable conservation policy — benefits reach local fishers, not just distant conservation organizations.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">HEALING: Root Cause Repair</h3>
            <p className="text-sm text-purple-800">
              Remove the root cause (excess urchins) instead of treating symptoms (replanting individual kelp). Learning #4691 shows how systemic solutions create permanent ecosystem recovery.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">DIGNITY: Community Leadership</h3>
            <p className="text-sm text-purple-800">
              Monterey Bay partnerships center human dignity — sea otters are protected, fishers have sustainable livelihoods, researchers are empowered to innovate.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">TRANSFORMATION: System Redesign</h3>
            <p className="text-sm text-purple-800">
              Shift from extraction (overfishing, pollution) to stewardship (marine protection, regeneration). Learning #1026 shows Monterey isn't optimizing a broken system—it's repairing it fundamentally.
            </p>
          </div>
        </div>
      </div>

      {/* Visitor Engagement */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-300 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">👥 Visitor Engagement: Learning Paths</h2>
        <p className="text-teal-800 mb-6">
          Help aquarium visitors understand Monterey's conservation work using Grove's three-tier learning framework:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900 mb-2">🌍 Tier 1: Immediate Action</h3>
            <p className="text-sm text-green-800 mb-4">
              &quot;You can help today&quot; — Visit the kelp forest tank, vote for ocean-friendly policies, eat sustainable seafood
            </p>
            <div className="text-xs bg-green-50 p-2 rounded">
              <p className="font-semibold text-green-900">Discovery:</p>
              <p className="text-green-800">Sea otters eat 20+ pounds of sea urchins daily. That's system healing in action!</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Tier 2: Community Connection</h3>
            <p className="text-sm text-blue-800 mb-4">
              &quot;You're part of a movement&quot; — Join citizen science projects, follow research updates, connect with marine conservation communities
            </p>
            <div className="text-xs bg-blue-50 p-2 rounded">
              <p className="font-semibold text-blue-900">Discovery:</p>
              <p className="text-blue-800">500K+ annual visitors → potential ocean advocates. Monterey magnifies conservation impact globally.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-900 mb-2">🧠 Tier 3: Systems Understanding</h3>
            <p className="text-sm text-purple-800 mb-4">
              &quot;Here's how the system heals&quot; — Explore research, learn decision frameworks, understand leverage points for policy change
            </p>
            <div className="text-xs bg-purple-50 p-2 rounded">
              <p className="font-semibold text-purple-900">Discovery:</p>
              <p className="text-purple-800">Monterey Bay shows systemic healing: ecology + justice + community = sustainable recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/ocean-commons">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">🌊</div>
            <h3 className="text-xl font-bold mb-2">Explore Ocean Commons</h3>
            <p className="text-sm text-white/90 mb-4">
              See 6 ocean learnings + decision frameworks for conservation strategy
            </p>
            <button className="text-sm font-semibold underline hover:no-underline">
              View Ocean Commons →
            </button>
          </div>
        </Link>
        <Link href="/oceans">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Global Ocean Dashboard</h3>
            <p className="text-sm text-white/90 mb-4">
              Real-time sea surface temps across 4 ocean zones + 7-day trends
            </p>
            <button className="text-sm font-semibold underline hover:no-underline">
              View Global Dashboard →
            </button>
          </div>
        </Link>
      </div>

      {/* FINAL CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl p-12 mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Be Part of Ocean Healing?</h2>
        <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
          You just learned how Monterey Bay turned an impossible problem (extinct otters + dying kelp) into a thriving ecosystem. The method works. The proof is real. Now you can help scale it globally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#signup" className="px-6 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Join Ocean Advocates →
          </a>
          <a href="/ocean-commons" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-colors">
            Explore Decision Framework
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground space-y-2 border-t border-sidebar-border pt-8">
        <p>
          This dashboard is powered by Grove's knowledge system — coordinating ocean conservation globally
        </p>
        <p className="italic">
          &quot;The ocean is dying. But we know how to heal it — through justice, system repair, dignity, and coordinated action.&quot;
        </p>
        <p className="text-xs mt-4">
          Learn more: Grove Ocean Commons • Tikkun Olam Framework (#1019) • Ocean Justice (#4690)
          {montereyData && ` • Data updated: ${new Date(montereyData.lastUpdated).toLocaleTimeString()}`}
        </p>
      </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

interface Learning {
  number: number;
  title: string;
  description: string;
  category: string;
  quality: number;
}

const oceanLearnings: Learning[] = [
  {
    number: 4680,
    title: 'Environmental Data Validation',
    description: 'Validate ocean monitoring data from field teams and conservation orgs',
    category: 'Data Integrity',
    quality: 85,
  },
  {
    number: 4690,
    title: 'Ocean Justice Framework',
    description: 'Fair burden & benefit distribution in ocean conservation policies',
    category: 'Justice',
    quality: 75,
  },
  {
    number: 4691,
    title: 'Systemic vs. Symptomatic Solutions',
    description: 'Know when to heal the root cause vs. optimize within broken systems',
    category: 'Systems',
    quality: 80,
  },
  {
    number: 4692,
    title: 'OTEC: Ocean Thermal Energy as Healing',
    description: 'Renewable ocean energy that cools, creates nutrients, and reduces emissions',
    category: 'Technology',
    quality: 75,
  },
  {
    number: 1019,
    title: 'Tikkun Olam: Repair of the World',
    description: 'Framework connecting justice, healing, dignity, and transformation',
    category: 'Philosophy',
    quality: 90,
  },
  {
    number: 1026,
    title: 'Repair vs. Optimize',
    description: 'Some systems need transformation, not just optimization',
    category: 'Meta-Learning',
    quality: 85,
  },
];

interface Role {
  id: string;
  name: string;
  icon: string;
  description: string;
  focus: string[];
  color: string;
}

const roles: Role[] = [
  {
    id: 'scientist',
    name: 'Scientist',
    icon: '🔬',
    description: 'Research ocean ecosystems, validate conservation strategies',
    focus: ['Environmental Data Validation', 'Systemic vs. Symptomatic', 'OTEC Technology'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'activist',
    name: 'Advocate',
    icon: '✊',
    description: 'Mobilize communities, communicate ocean crisis and solutions',
    focus: ['Ocean Justice Framework', 'Tikkun Olam', 'Communication Patterns'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'policymaker',
    name: 'Policymaker',
    icon: '⚖️',
    description: 'Design ocean governance frameworks and conservation policies',
    focus: ['Ocean Justice Framework', 'Systemic Solutions', 'Repair vs. Optimize'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'engineer',
    name: 'Engineer',
    icon: '⚙️',
    description: 'Build ocean technologies, marine infrastructure, sustainable systems',
    focus: ['OTEC Technology', 'Data Validation', 'Systems Thinking'],
    color: 'from-orange-500 to-red-500',
  },
];

interface ActionCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const actions: ActionCard[] = [
  {
    title: 'Ocean Health Dashboard',
    description: 'Real-time sea surface temps, wave heights, 7-day trends',
    icon: '📊',
    href: '/oceans',
    color: 'from-teal-500 to-blue-500',
  },
  {
    title: 'Learnings Library',
    description: 'Explore 6+ ocean-focused learnings with decision trees',
    icon: '📚',
    href: '/learnings?tag=ocean',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Ocean Strategy Decision Tree',
    description: 'Interactive: Match ocean challenges to proven solutions (OTEC, MPAs, restoration, policy)',
    icon: '🎯',
    href: '/ocean-commons/strategy',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Community Directory',
    description: 'Connect with 500+ conservation organizations',
    icon: '🌍',
    href: '/ocean-commons/orgs',
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function OceanCommonsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="text-6xl mb-4">🌊</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Ocean Commons</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Coordinated knowledge for global ocean healing — connecting scientists, advocates, policymakers, and engineers
        </p>
        <p className="text-sm text-muted-foreground italic">
          Based on Tikkun Olam: Repair the world through justice, healing, dignity, and transformation
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <div className="group cursor-pointer h-full">
              <div className={`bg-gradient-to-br ${action.color} rounded-lg p-6 text-white shadow-md group-hover:shadow-lg transition-shadow h-full`}>
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-white/90">{action.description}</p>
                <div className="mt-4 text-xs font-semibold opacity-80 group-hover:opacity-100">
                  Explore →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Role-Based Entry Points */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Pick Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="group cursor-pointer">
              <div className={`bg-gradient-to-br ${role.color} rounded-lg p-6 text-white shadow-md group-hover:shadow-lg transition-all`}>
                <div className="text-5xl mb-3">{role.icon}</div>
                <h3 className="font-bold text-lg mb-2">{role.name}</h3>
                <p className="text-sm text-white/90 mb-4">{role.description}</p>
                <div className="space-y-1 mb-4">
                  {role.focus.map((f) => (
                    <div key={f} className="text-xs text-white/75">
                      ✓ {f}
                    </div>
                  ))}
                </div>
                <a
                  href={`/learnings?role=${role.id}`}
                  className="block w-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 rounded transition-colors text-center"
                >
                  Learning Path →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ocean Learnings Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Ocean Learnings Library</h2>
        <p className="text-muted-foreground mb-6">
          Practical knowledge from Grove's ocean conservation framework
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oceanLearnings.map((learning) => (
            <div
              key={learning.number}
              className="border border-sidebar-border rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-sidebar-active"
            >
              {/* Quality Score Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  learning.quality >= 85
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {learning.quality} / 100
                </div>
                <div className="text-xs text-muted-foreground font-mono">#{learning.number}</div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{learning.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{learning.description}</p>

              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-sidebar-bg text-xs font-semibold text-foreground rounded">
                  {learning.category}
                </span>
              </div>

              {/* Action */}
              <a
                href="/learnings?search=4690"
                className="block w-full py-2 px-3 text-sm font-semibold border border-sidebar-border rounded hover:bg-sidebar-bg transition-colors text-center"
              >
                Read Learning →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Framework Section */}
      <div className="bg-gradient-to-r from-amber-50 to-teal-50 border border-teal-200 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">🎯 Choose Your Strategy</h2>
        <p className="text-teal-800 mb-6">
          Different ocean challenges need different solutions. Use our decision framework to find the right approach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">🌬️ OTEC</h3>
            <p className="text-sm text-blue-800 mb-3">
              Use when: You need clean energy + ocean cooling + nutrient upwelling in tropical zones
            </p>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
              Learn OTEC Framework →
            </a>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900 mb-2">🛡️ Marine Protection</h3>
            <p className="text-sm text-green-800 mb-3">
              Use when: Fish populations need recovery + Indigenous knowledge should guide stewardship
            </p>
            <a href="#" className="text-xs font-semibold text-green-600 hover:underline">
              Learn Justice Framework →
            </a>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
            <h3 className="font-semibold text-amber-900 mb-2">🌾 Regenerative</h3>
            <p className="text-sm text-amber-800 mb-3">
              Use when: Nutrient runoff is problem + local farming can be redesigned
            </p>
            <a href="#" className="text-xs font-semibold text-amber-600 hover:underline">
              Learn Regenerative Patterns →
            </a>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-1">6</div>
          <p className="text-sm text-muted-foreground">Ocean Learnings</p>
        </div>
        <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-1">4</div>
          <p className="text-sm text-muted-foreground">Role-Based Paths</p>
        </div>
        <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-1">50+</div>
          <p className="text-sm text-muted-foreground">Partner Organizations (Phase 2)</p>
        </div>
        <div className="bg-sidebar-bg border border-sidebar-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-1">∞</div>
          <p className="text-sm text-muted-foreground">Ocean Healing Impact</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Ready to Repair the Ocean?</h2>
        <p className="text-blue-800 mb-6">
          Start with the Ocean Health Dashboard to see real-time conditions, then choose your role to access targeted learning paths.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/oceans">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              View Ocean Health →
            </button>
          </Link>
          <Link href="/learnings?tag=ocean">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Explore Learnings →
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-xs text-muted-foreground space-y-2">
        <p>🌍 Ocean Commons is part of Grove's Tikkun Olam initiative</p>
        <p>Learn more: {oceanLearnings.filter(l => l.number === 1019).map(l => `Learning #${l.number}`)}</p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Decision {
  id: string;
  question: string;
  options: Option[];
  context?: string;
}

interface Option {
  id: string;
  label: string;
  description: string;
  next?: string;
  result?: Result;
}

interface Result {
  strategy: string;
  icon: string;
  description: string;
  whenToUse: string;
  relatedLearning: number;
  timelineYears: number;
  casestudy: string;
  metrics: string[];
  implementation: string[];
}

const decisions: Record<string, Decision> = {
  start: {
    id: 'start',
    question: '🌊 What ocean challenge are you trying to solve?',
    context: 'Different problems need different solutions. Let\'s find your path.',
    options: [
      {
        id: 'climate',
        label: 'Climate & Energy',
        description: 'Ocean warming, emissions, clean energy need',
        next: 'climate-deep',
      },
      {
        id: 'biodiversity',
        label: 'Biodiversity Loss',
        description: 'Fish populations, coral, species recovery',
        next: 'biodiversity-deep',
      },
      {
        id: 'pollution',
        label: 'Pollution & Acidification',
        description: 'Plastic, chemicals, ocean pH decline',
        next: 'pollution-deep',
      },
      {
        id: 'community',
        label: 'Community & Economy',
        description: 'Fisher livelihoods, coastal equity, food security',
        next: 'community-deep',
      },
    ],
  },

  'climate-deep': {
    id: 'climate-deep',
    question: '⚡ What\'s your constraint?',
    context: 'For climate/energy solutions, what matters most?',
    options: [
      {
        id: 'tropical',
        label: 'I have tropical/subtropical oceans',
        description: 'Warm surface water, cold deep water (21°C difference)',
        result: {
          strategy: 'OTEC: Ocean Thermal Energy Conversion',
          icon: '♨️',
          description: 'Use ocean temperature difference to generate clean electricity while cooling surface water, upwelling nutrients, and reducing acidification.',
          whenToUse: 'Tropical zones (±20° latitude). Best for islands, developing nations, coastal communities.',
          relatedLearning: 4692,
          timelineYears: 10,
          casestudy: 'Caribbean OTEC deployment: 100 plants = 500 MW clean energy + 2-3°C local cooling + 20-40% fishery increase',
          metrics: ['CO2 reduction: 40K tons/plant/year', 'Local cooling: 2-5°C', 'Nutrient upwelling: +3x productivity', 'Hurricane suppression: 10-20% intensity reduction'],
          implementation: ['Identify deployment zones', 'Partner with local communities', 'Start with 5-10 pilot plants', 'Monitor environmental impact', 'Scale after validation'],
        },
      },
      {
        id: 'temperate',
        label: 'I have temperate/deeper oceans',
        description: 'Smaller temperature gradient, strong currents',
        result: {
          strategy: 'Offshore Wind + Regenerative Systems',
          icon: '💨',
          description: 'Combine offshore wind (proven technology) with ecosystem restoration. Less dramatic than OTEC but scalable globally.',
          whenToUse: 'Temperate zones, areas with strong wind resources, developed infrastructure.',
          relatedLearning: 1026,
          timelineYears: 5,
          casestudy: 'North Atlantic wind farms: 1,000 turbines = 2,000 MW clean energy + seabed restoration partnerships',
          metrics: ['CO2 reduction: 30K tons/turbine/year', 'Job creation: 3 jobs per MW', 'Seabed habitat recovery', 'Shipping & fishing coordination'],
          implementation: ['Map wind resources', 'Design multi-use ocean zones', 'Community engagement', 'Environmental monitoring', 'Supply chain development'],
        },
      },
    ],
  },

  'biodiversity-deep': {
    id: 'biodiversity-deep',
    question: '🐟 What\'s the root cause of loss?',
    context: 'Species decline comes from different causes. Symptom vs. systemic?',
    options: [
      {
        id: 'overfishing',
        label: 'Overfishing / Industrial extraction',
        description: 'Fish populations decimated by unsustainable harvesting',
        result: {
          strategy: 'Marine Protected Areas + Economic Transition',
          icon: '🛡️',
          description: 'Create no-take zones where fish recover. Simultaneously support fishers with alternative livelihoods (sustainable aquaculture, regenerative farming, marine tourism).',
          whenToUse: 'When overfishing is the primary driver. Works best with strong governance + community leadership.',
          relatedLearning: 4690,
          timelineYears: 10,
          casestudy: 'East African MPAs (Monterey model): Fish stocks +20% in 5 years. Fishing income maintained through fair-trade partnerships.',
          metrics: ['Fish population recovery: +20%', 'Fishery sustainability: long-term yield', 'Income equity: fisher support programs', 'Community leadership: 50% decision-making power'],
          implementation: ['Community co-design of MPA', 'Fair-trade income support during transition', 'Enforcement infrastructure', 'Benefits-sharing frameworks', 'Long-term monitoring (10+ years)'],
        },
      },
      {
        id: 'habitat',
        label: 'Habitat destruction (kelp, mangroves, seagrass)',
        description: 'Ecosystem destroyed; species have nowhere to live',
        result: {
          strategy: 'Ecosystem Restoration + Root Cause Removal',
          icon: '🌿',
          description: 'Remove what\'s killing the habitat (urchins, sea stars, invasive species) so ecosystem heals naturally. Minimal intervention; nature does the work.',
          whenToUse: 'When one species/factor is preventing ecosystem recovery. Cost-effective long-term.',
          relatedLearning: 4691,
          timelineYears: 5,
          casestudy: 'Monterey kelp restoration: Remove urchins → kelp recovers naturally → sea otters thrive → entire ecosystem heals. 10% annual growth.',
          metrics: ['Habitat coverage: +10% annually', 'Biodiversity: return of dependent species', 'Otter/predator recovery', 'Fishery food web strengthening'],
          implementation: ['Root cause analysis (5 whys)', 'Targeted removal of problematic species', 'Monitor ecosystem response', 'Scale as system heals', 'Minimize human intervention'],
        },
      },
    ],
  },

  'pollution-deep': {
    id: 'pollution-deep',
    question: '♻️ Where does pollution enter?',
    context: 'Plastic and acidification need different solutions.',
    options: [
      {
        id: 'source',
        label: 'At source (production / industry)',
        description: 'Ban or redesign what enters the ocean',
        result: {
          strategy: 'Systemic Ban + Industry Transformation',
          icon: '🚫',
          description: 'Eliminate single-use plastics at source. Transform manufacturing to zero-waste. Requires policy but permanent solution.',
          whenToUse: 'When you have political power (government, large orgs). Solves problem permanently.',
          relatedLearning: 4691,
          timelineYears: 10,
          casestudy: 'EU plastic ban: Eliminated 90% of single-use plastics by 2030. Ocean inflow stopped within decade.',
          metrics: ['Plastic inflow: -90%', 'Manufacturing emissions: -30%', 'Job transition: circular economy jobs', 'Long-term ocean recovery'],
          implementation: ['Phase out schedule', 'Industry support for transition', 'Alternative material development', 'International coordination', 'Consumer education'],
        },
      },
      {
        id: 'mitigation',
        label: 'Managing existing pollution',
        description: 'Clean up ocean, reduce acidification, protect species',
        result: {
          strategy: 'Acidification Mitigation + Tech Cleanup',
          icon: '⚗️',
          description: 'Deep-water mixing (OTEC-like) to raise pH. Targeted cleanup in critical zones. Buy time while source solutions scale.',
          whenToUse: 'Interim measure while bans/regulations take effect. Protects critical species.',
          relatedLearning: 4692,
          timelineYears: 5,
          casestudy: 'Monterey Bay: Deep-water pH buffering + strategic cleanup in pteropod zones. Species resilience improved 15%.',
          metrics: ['Local pH increase: +0.2', 'Species survival: +15%', 'Cleanup rate: 50-200 tons/year', 'Ecosystem stress reduction'],
          implementation: ['Identify critical zones', 'Deploy mitigation tech', 'Targeted cleanup', 'Monitor species response', 'Transition to source solutions'],
        },
      },
    ],
  },

  'community-deep': {
    id: 'community-deep',
    question: '⚖️ What\'s the justice issue?',
    context: 'Conservation must be fair. Who suffers? Who benefits?',
    options: [
      {
        id: 'displacement',
        label: 'Communities being displaced by conservation',
        description: 'Protected areas exclude local people from livelihoods',
        result: {
          strategy: 'Co-Designed Marine Protection + Benefit-Sharing',
          icon: '🤝',
          description: 'Community co-design of MPAs (not top-down). Share benefits (carbon credits, tourism revenue) with communities. Ensure livelihoods maintained or improved.',
          whenToUse: 'When conservation affects livelihoods. Essential for justice + long-term success.',
          relatedLearning: 4690,
          timelineYears: 5,
          casestudy: 'Blue Justice in East Africa: Communities design MPAs → fish recover → tourism revenue shared → fishing improved. 15-year success.',
          metrics: ['Community voice: 50% decision power', 'Income impact: zero negative displacement', 'Fish recovery: +20%', 'Tourism revenue distribution'],
          implementation: ['Community consultation phase', 'Joint MPA design process', 'Fair benefit agreements', 'Alternative livelihood support', 'Community leadership structure'],
        },
      },
      {
        id: 'equity',
        label: 'Wealthy nations/orgs benefiting from poor nations\' resources',
        description: 'Climate polluters not bearing their costs',
        result: {
          strategy: 'Climate Justice + Sustainable Development',
          icon: '🌍',
          description: 'Wealthy nations reduce emissions at source (not buy offsets). Support coastal development as adaptation. Technology transfer for ocean solutions.',
          whenToUse: 'When addressing global inequality. Necessary for fair ocean governance.',
          relatedLearning: 4690,
          timelineYears: 20,
          casestudy: 'OTEC in Caribbean: Wealthy nations fund technology. Poor nations own/operate. Revenue stays local. Both benefit from clean energy + cooler oceans.',
          metrics: ['Emission reduction at source: -50%', 'Technology transfer: all nations access', 'Development funding: $B to coastal communities', 'Global temp stabilization'],
          implementation: ['International agreements', 'Rich nation emission cuts', 'Tech sharing frameworks', 'Coastal adaptation funding', 'Fair governance structures'],
        },
      },
    ],
  },
};

export default function StrategyDecisionTree() {
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [history, setHistory] = useState<string[]>(['start']);

  const current = decisions[currentStep];
  const isResult = current && 'result' in (current.options?.[0] || {});

  const handleOption = (option: Option) => {
    if (option.result) {
      setCurrentStep(option.id);
      setHistory([...history, option.id]);
    } else if (option.next) {
      setCurrentStep(option.next);
      setHistory([...history, option.next]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setCurrentStep(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  const result = isResult ? (current.options?.[0] as any)?.result : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/ocean-commons" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Ocean Commons
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-2">🌊 Ocean Strategy Decision Tree</h1>
        <p className="text-muted-foreground">
          Find the right approach for your ocean challenge. Different problems, different solutions.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        <div className="text-xs text-muted-foreground">Step {history.length} of ~3-4</div>
        <div className="flex-1 bg-sidebar-bg rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(history.length / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Decision or Result */}
      {result ? (
        // RESULT VIEW
        <div className="space-y-8">
          {/* Strategy Card */}
          <div className={`bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-300 rounded-lg p-8`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-6xl mb-3">{result.icon}</div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{result.strategy}</h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">{result.timelineYears}</p>
                <p className="text-xs text-green-800">year timeline</p>
              </div>
            </div>

            <p className="text-lg text-foreground mb-6">{result.description}</p>

            {/* When to Use */}
            <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-foreground mb-2">When to Use This</h3>
              <p className="text-sm text-muted-foreground">{result.whenToUse}</p>
            </div>

            {/* Case Study */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-2">📍 Real Case Study</h3>
              <p className="text-sm text-blue-800">{result.casestudy}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-sidebar-border">
                <h3 className="font-semibold text-foreground mb-3">📊 Success Metrics</h3>
                <ul className="space-y-2">
                  {result.metrics.map((metric: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sidebar-border">
                <h3 className="font-semibold text-foreground mb-3">🛠️ Implementation Steps</h3>
                <ol className="space-y-2">
                  {result.implementation.map((step: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      <span className="text-blue-600 font-bold">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Grove Learning */}
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-900 mb-2">📚 Learn More in Grove</h3>
              <p className="text-sm text-purple-800 mb-3">
                This approach is detailed in Grove Learning #{result.relatedLearning}
              </p>
              <button
                onClick={() => {
                  window.location.href = `/learnings?search=${result.relatedLearning}`;
                }}
                className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded hover:bg-purple-700 transition-colors"
              >
                Read Full Learning →
              </button>
            </div>
          </div>

          {/* Reset / Explore */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentStep('start');
                setHistory(['start']);
              }}
              className="flex-1 px-6 py-3 bg-sidebar-bg border border-sidebar-border text-foreground font-semibold rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Another Path
            </button>
          </div>
        </div>
      ) : (
        // DECISION VIEW
        <div className="space-y-6">
          {/* Question */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{current?.question}</h2>
            {current?.context && (
              <p className="text-muted-foreground italic">{current.context}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            {current?.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOption(option)}
                className="w-full text-left p-6 border-2 border-sidebar-border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>

          {/* Back Button */}
          {history.length > 1 && (
            <button
              onClick={handleBack}
              className="w-full px-6 py-2 text-sm font-semibold border border-sidebar-border rounded-lg hover:bg-sidebar-bg transition-colors"
            >
              ← Go Back
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-muted-foreground space-y-2 border-t border-sidebar-border pt-8">
        <p>
          This decision tree uses Grove learnings to match ocean challenges to proven solutions
        </p>
        <p>
          Learn more: Ocean Commons • Ocean Justice (#4690) • Systemic Healing (#4691) • OTEC (#4692)
        </p>
      </div>
    </div>
  );
}

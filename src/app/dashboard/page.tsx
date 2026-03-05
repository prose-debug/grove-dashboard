'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Role {
  id: string;
  name: string;
  description?: string;
  features: string[];
}

const ROLES: Role[] = [
  {
    id: 'qa',
    name: 'QA Engineer',
    description: 'Test automation, coverage analysis, bug tracking',
    features: ['qa-automation', 'test-generation', 'bug-tracking', 'coverage-analysis'],
  },
  {
    id: 'developer',
    name: 'Backend/Frontend Developer',
    description: 'Code review, documentation, PR workflows',
    features: ['code-review', 'documentation', 'pr-workflows', 'api-generation'],
  },
  {
    id: 'pm',
    name: 'Product Manager',
    description: 'Documentation, learnings, team metrics',
    features: ['documentation', 'learnings', 'knowledge-search', 'team-metrics'],
  },
  {
    id: 'new_hire',
    name: 'New Hire / Onboarding',
    description: 'Onboarding guides, tutorials, support',
    features: ['onboarding', 'learnings', 'tutorials', 'guided-tours'],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    // Load saved role from localStorage
    const saved = localStorage.getItem('grove-role');
    if (saved) {
      setSelectedRole(saved);
      router.push(`/dashboard/${saved}`);
    }
  }, [router]);

  const handleSelectRole = (roleId: string) => {
    localStorage.setItem('grove-role', roleId);
    setSelectedRole(roleId);
    router.push(`/dashboard/${roleId}`);
  };

  return (
    <div className="p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Select Your Role</h1>
        <p className="text-foreground/70 mb-12">
          Choose your role to see personalized learnings and insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className="p-6 border border-sidebar-border rounded-lg hover:border-sidebar-active hover:bg-sidebar-hover transition text-left"
            >
              <h2 className="text-xl font-semibold mb-2">{role.name}</h2>
              <p className="text-sm text-foreground/70 mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {role.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-sidebar-hover px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

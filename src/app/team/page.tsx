'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TEAM_ADOPTION = [
  { team: 'QA', adoption: 85, members: 10 },
  { team: 'Backend', adoption: 60, members: 15 },
  { team: 'Frontend', adoption: 50, members: 8 },
  { team: 'Mobile', adoption: 45, members: 22 },
  { team: 'DevOps', adoption: 30, members: 3 },
];

const RECENT_STATS = [
  { label: 'Learnings Viewed (This Week)', value: '245', icon: '📖' },
  { label: 'Teams Active', value: '5', icon: '👥' },
  { label: 'Total Members', value: '58', icon: '👤' },
  { label: 'Avg Adoption Rate', value: '54%', icon: '📈' },
];

export default function TeamPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Team Learning Metrics</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {RECENT_STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-6 border border-sidebar-border rounded-lg bg-card-bg"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-sm text-foreground/70 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Adoption by Team Chart */}
      <div className="p-6 border border-sidebar-border rounded-lg mb-12 bg-card-bg">
        <h2 className="text-xl font-semibold mb-6">Adoption Rate by Team</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={TEAM_ADOPTION}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="adoption" fill="#4f46e5" name="Adoption %" />
            <Bar dataKey="members" fill="#059669" name="Members" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Details */}
      <div className="p-6 border border-sidebar-border rounded-lg bg-card-bg">
        <h2 className="text-xl font-semibold mb-6">Team Breakdown</h2>
        <div className="space-y-4">
          {TEAM_ADOPTION.map((team) => (
            <div key={team.team} className="flex items-center justify-between pb-4 border-b border-sidebar-border last:border-b-0">
              <div>
                <p className="font-medium">{team.team}</p>
                <p className="text-sm text-foreground/70">{team.members} members</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48 h-2 bg-sidebar-hover rounded-full overflow-hidden">
                  <div
                    className="h-full bg-badge-blue"
                    style={{ width: `${team.adoption}%` }}
                  />
                </div>
                <p className="text-sm font-semibold w-12 text-right">{team.adoption}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

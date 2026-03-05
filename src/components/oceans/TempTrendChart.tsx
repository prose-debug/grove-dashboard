'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LocationData {
  name: string;
  lat: number;
  lon: number;
  currentTemp: number;
  waveHeight: number;
  hourlyTemps: number[];
  hourlyDates: string[];
}

interface TempTrendChartProps {
  locations: LocationData[];
}

const COLORS = {
  'North Pacific': '#0284c7',
  'North Atlantic': '#06b6d4',
  'Great Barrier Reef': '#f59e0b',
  'Arctic Ocean': '#06b6d4',
};

export function TempTrendChart({ locations }: TempTrendChartProps) {
  if (locations.length === 0) {
    return <div className="text-gray-500 text-center py-8">No data available</div>;
  }

  // Find the maximum hourly data length
  const maxLength = Math.max(...locations.map((l) => l.hourlyDates.length));

  // Transform data for Recharts: each data point represents a time interval
  const chartData = Array.from({ length: maxLength }, (_, i) => {
    const dataPoint: Record<string, any> = {};

    locations.forEach((location) => {
      if (i < location.hourlyDates.length) {
        dataPoint[location.name] = location.hourlyTemps[i];
      }
    });

    // Add a time label (every 24 hours to avoid clutter)
    if (i % 24 === 0 && maxLength > 0 && i < locations[0].hourlyDates.length) {
      const date = new Date(locations[0].hourlyDates[i]);
      dataPoint.time = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      dataPoint.time = '';
    }

    return dataPoint;
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Temperature Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '1rem' }} />

          {locations.map((location) => (
            <Line
              key={location.name}
              type="monotone"
              dataKey={location.name}
              stroke={COLORS[location.name as keyof typeof COLORS] || '#9ca3af'}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="text-xs text-gray-500 mt-4 text-center">
        Data updates every 10 minutes • Source: Open-Meteo Marine API
      </div>
    </div>
  );
}

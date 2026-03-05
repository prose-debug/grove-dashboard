interface OceanCardProps {
  name: string;
  currentTemp: number;
  waveHeight: number;
  tempPreviousDay: number;
}

export function OceanCard({ name, currentTemp, waveHeight, tempPreviousDay }: OceanCardProps) {
  const tempTrend = currentTemp - tempPreviousDay;
  const trendArrow = tempTrend > 0.5 ? '📈' : tempTrend < -0.5 ? '📉' : '→';
  const trendText = tempTrend > 0.5 ? 'warming' : tempTrend < -0.5 ? 'cooling' : 'stable';

  // Color-code based on temperature
  let bgColor = 'bg-blue-50 border-blue-200'; // cold < 15
  let textColor = 'text-blue-900';

  if (currentTemp >= 15 && currentTemp < 22) {
    bgColor = 'bg-teal-50 border-teal-200';
    textColor = 'text-teal-900';
  } else if (currentTemp >= 22) {
    bgColor = 'bg-amber-50 border-amber-200';
    textColor = 'text-amber-900';
  }

  return (
    <div className={`${bgColor} border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <h3 className={`${textColor} text-lg font-semibold mb-4`}>{name}</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Sea Surface Temp</span>
          <span className={`${textColor} text-2xl font-bold`}>{currentTemp}°C</span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Wave Height</span>
          <span className={`${textColor} text-lg font-semibold`}>{waveHeight}m</span>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <span className="text-2xl">{trendArrow}</span>
          <span className="text-sm text-gray-700">
            <span className={`font-semibold ${textColor}`}>{Math.abs(tempTrend).toFixed(1)}°C</span>{' '}
            <span className="text-gray-600">{trendText} vs 24h</span>
          </span>
        </div>
      </div>
    </div>
  );
}

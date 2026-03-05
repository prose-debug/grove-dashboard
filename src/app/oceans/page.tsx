import { OceanCard } from '@/components/oceans/OceanCard';
import { TempTrendChart } from '@/components/oceans/TempTrendChart';

interface LocationData {
  name: string;
  lat: number;
  lon: number;
  currentTemp: number;
  waveHeight: number;
  hourlyTemps: number[];
  hourlyDates: string[];
}

interface OceanResponse {
  locations: LocationData[];
  lastUpdated: string;
}

async function getOceanData(): Promise<OceanResponse | null> {
  try {
    const response = await fetch(
      new URL('http://localhost:3001/api/oceans').toString(),
      {
        // Disable cache to ensure fresh data on every request in dev
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch ocean data:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching ocean data:', error);
    return null;
  }
}

export default async function OceansPage() {
  const data = await getOceanData();

  // SVG sunrays for warm beams aesthetic
  const SunRaysHeader = () => (
    <div className="relative w-full h-32 bg-gradient-to-b from-amber-400 to-teal-200 rounded-lg overflow-hidden mb-8">
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI;
          const startX = 200;
          const startY = 100;
          const endX = 200 + Math.cos(angle - Math.PI / 2) * 150;
          const endY = 100 + Math.sin(angle - Math.PI / 2) * 150;

          return (
            <line
              key={i}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber-600"
            />
          );
        })}
      </svg>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">🌊</div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Ocean Health Dashboard</h1>
          <p className="text-white text-sm drop-shadow mt-2">Real-time sea surface temperatures & wave conditions</p>
        </div>
      </div>
    </div>
  );

  if (!data || data.locations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SunRaysHeader />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-semibold">Unable to load ocean data</p>
          <p className="text-sm mt-1">Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  // Calculate 24-hour temperature change for trend calculation
  const getTemp24hAgo = (location: LocationData): number => {
    // 24 hours back in hourly data
    const index = Math.min(24, location.hourlyTemps.length - 1);
    return location.hourlyTemps[index] || location.currentTemp;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SunRaysHeader />

      {/* Ocean Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {data.locations.map((location) => (
          <OceanCard
            key={`${location.lat}-${location.lon}`}
            name={location.name}
            currentTemp={location.currentTemp}
            waveHeight={location.waveHeight}
            tempPreviousDay={getTemp24hAgo(location)}
          />
        ))}
      </div>

      {/* Trend Chart */}
      <TempTrendChart locations={data.locations} />

      {/* Ways to Help Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 border border-teal-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">🌱 Ways You Can Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-teal-900 mb-2">Reduce Carbon</h3>
            <p className="text-sm text-teal-800">
              Support renewable energy, reduce fossil fuel consumption, and offset your carbon footprint.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-teal-900 mb-2">Protect Ecosystems</h3>
            <p className="text-sm text-teal-800">
              Support marine conservation organizations working to protect coral reefs and ocean biodiversity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-teal-900 mb-2">Make Sustainable Choices</h3>
            <p className="text-sm text-teal-800">
              Choose sustainable seafood, reduce plastic use, and support ocean-friendly businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-gray-500 space-y-1">
        <p>🌍 Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        <p>Data: Open-Meteo Marine API (free, no auth) • Updates every 10 minutes</p>
      </div>
    </div>
  );
}

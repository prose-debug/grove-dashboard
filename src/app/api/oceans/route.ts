import { NextRequest, NextResponse } from 'next/server';

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

const OCEAN_LOCATIONS = [
  { name: 'North Pacific', lat: 35, lon: -140 },
  { name: 'North Atlantic', lat: 40, lon: -45 },
  { name: 'Great Barrier Reef', lat: -18, lon: 147 },
  { name: 'Arctic Ocean', lat: 75, lon: 10 },
];

async function fetchMarineData(lat: number, lon: number): Promise<LocationData | null> {
  try {
    const url = new URL('https://marine-api.open-meteo.com/v1/marine');
    url.searchParams.set('latitude', lat.toString());
    url.searchParams.set('longitude', lon.toString());
    url.searchParams.set('hourly', 'sea_surface_temperature,wave_height');
    url.searchParams.set('forecast_days', '7');
    url.searchParams.set('timezone', 'UTC');

    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error(`Marine API error for (${lat}, ${lon}):`, response.status);
      return null;
    }

    const data = await response.json();

    // Extract current temperature (first hourly value)
    const currentTemp = data.hourly?.sea_surface_temperature?.[0] ?? 0;
    const waveHeight = data.hourly?.wave_height?.[0] ?? 0;
    const hourlyTemps = data.hourly?.sea_surface_temperature?.slice(0, 168) ?? []; // 7 days of hourly
    const hourlyDates = data.hourly?.time?.slice(0, 168) ?? [];

    const location = OCEAN_LOCATIONS.find((l) => l.lat === lat && l.lon === lon);

    return {
      name: location?.name || `Location (${lat}, ${lon})`,
      lat,
      lon,
      currentTemp: Math.round(currentTemp * 10) / 10,
      waveHeight: Math.round(waveHeight * 10) / 10,
      hourlyTemps: hourlyTemps.map((t: number) => Math.round(t * 10) / 10),
      hourlyDates,
    };
  } catch (error) {
    console.error(`Error fetching marine data for (${lat}, ${lon}):`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch data for all locations in parallel
    const locationDataPromises = OCEAN_LOCATIONS.map((loc) =>
      fetchMarineData(loc.lat, loc.lon)
    );
    const results = await Promise.all(locationDataPromises);

    // Filter out null results
    const locations = results.filter((loc) => loc !== null) as LocationData[];

    const response: OceanResponse = {
      locations,
      lastUpdated: new Date().toISOString(),
    };

    // Set cache headers: revalidate every 10 minutes
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error in /api/oceans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ocean data' },
      { status: 500 }
    );
  }
}

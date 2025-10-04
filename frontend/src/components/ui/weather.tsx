import type { WeatherData } from "@/types/weather";
import { getWeatherIcon } from "@/lib/utils/weather-utils";

const API_KEY = process.env.TOMORROW_API_KEY;
const LOCATION = process.env.TOMORROW_LOCATION;

// Fetch current weather data from Tomorrow.io API
async function getWeather(): Promise<WeatherData | null> {
  if (!API_KEY || !LOCATION) return null;

  try {
    const res = await fetch(
      `https://api.tomorrow.io/v4/timelines?location=${LOCATION}&fields=temperature,weatherCode&units=metric&timesteps=current&apikey=${API_KEY}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour instead of 10 minutes
      },
    );

    if (!res.ok) return null;

    const json = await res.json();
    const data = json.data.timelines[0].intervals[0].values;

    return {
      temp: data.temperature,
      weatherCode: data.weatherCode,
    };
  } catch {
    return null;
  }
}

export async function Weather() {
  const weather = await getWeather();

  if (!weather) {
    return (
      <div className="text-primary-400 dark:text-primary-200 opacity-50">
        Unable to load weather data.
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {getWeatherIcon(weather.weatherCode)}
      <div className="text-primary-400 dark:text-primary-200 opacity-50">
        {weather.temp.toFixed(1)}&deg;C
      </div>
    </div>
  );
}

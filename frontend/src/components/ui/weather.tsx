import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

const API_KEY = process.env.TOMORROW_API_KEY;
const LOCATION = process.env.TOMORROW_LOCATION;

type WeatherData = {
  temp: number;
  weatherCode: number;
};

const getWeatherIcon = (code: number) => {
  if (code >= 800 && code < 900)
    return (
      <Sun className="text-primary-400 dark:text-primary-200 opacity-50" />
    );
  if ([500, 501, 520, 521].includes(code))
    return (
      <CloudRain className="text-primary-400 dark:text-primary-200 opacity-50" />
    );
  if ([600, 601, 602].includes(code))
    return (
      <CloudSnow className="text-primary-400 dark:text-primary-200 opacity-50" />
    );
  if ([200, 201, 202].includes(code))
    return (
      <CloudLightning className="text-primary-400 dark:text-primary-200 opacity-50" />
    );
  if ([701, 711, 721, 741].includes(code))
    return (
      <Cloud className="text-primary-400 dark:text-primary-200 opacity-50" />
    );
  return (
    <Cloud className="text-primary-400 dark:text-primary-200 opacity-50" />
  );
};

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

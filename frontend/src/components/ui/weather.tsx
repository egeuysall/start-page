"use client";

import React, { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

type WeatherData = {
  temp: number;
  weatherCode: number;
};

const LOCATION = "42.1661,-87.9527";

const getWeatherIcon = (code: number) => {
  if (code >= 800 && code < 900)
    return (
      <div className="text-primary-200">
        <Sun />
      </div>
    );
  if ([500, 501, 520, 521].includes(code))
    return (
      <div className="text-primary-200 opacity-50">
        <CloudRain />
      </div>
    );
  if ([600, 601, 602].includes(code))
    return (
      <div className="text-primary-200 opacity-50">
        <CloudSnow />
      </div>
    );
  if ([200, 201, 202].includes(code))
    return (
      <div className="text-primary-200 opacity-50">
        <CloudLightning />
      </div>
    );
  if ([701, 711, 721, 741].includes(code))
    return (
      <div className="text-primary-200 opacity-50">
        <Cloud />
      </div>
    );
  return (
    <div className="text-primary-200 opacity-50">
      <Cloud />
    </div>
  );
};

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_API_KEY || "";

  useEffect(() => {
    if (!API_KEY) {
      setLoading(false);
      return;
    }
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.tomorrow.io/v4/timelines?location=${LOCATION}&fields=temperature,weatherCode&units=metric&timesteps=current&apikey=${API_KEY}`,
        );
        const json = await res.json();
        const data = json.data.timelines[0].intervals[0].values;
        setWeather({
          temp: data.temperature,
          weatherCode: data.weatherCode,
        });
      } catch {
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [API_KEY]);

  if (loading) return <div>Loading weather...</div>;
  if (!weather) return <div>Unable to load weather data.</div>;

  return (
    <div className="flex gap-2 items-center">
      {getWeatherIcon(weather.weatherCode)}
      <div className="text-primary-200 opacity-50">{weather.temp.toFixed(1)}°C</div>
    </div>
  );
};

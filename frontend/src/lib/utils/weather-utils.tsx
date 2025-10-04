import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

const ICON_CLASS = "text-primary-400 dark:text-primary-200 opacity-50";

// Map weather codes to appropriate icon components
export const getWeatherIcon = (code: number) => {
  // Clear/Sunny (800-899)
  if (code >= 800 && code < 900) return <Sun className={ICON_CLASS} />;

  // Rain (500s, 520s)
  if ([500, 501, 520, 521].includes(code)) return <CloudRain className={ICON_CLASS} />;

  // Snow (600s)
  if ([600, 601, 602].includes(code)) return <CloudSnow className={ICON_CLASS} />;

  // Thunderstorm (200s)
  if ([200, 201, 202].includes(code)) return <CloudLightning className={ICON_CLASS} />;

  // Fog/Mist (700s)
  if ([701, 711, 721, 741].includes(code)) return <Cloud className={ICON_CLASS} />;

  // Default: Cloudy
  return <Cloud className={ICON_CLASS} />;
};

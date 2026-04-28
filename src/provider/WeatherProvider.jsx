import { useState, useCallback } from "react";
import { WeatherContext } from "../context/Weather";
import toast from "react-hot-toast";

const mapWmoToOpenWeather = (code) => {
  if (code === 0) return "01d";
  if (code <= 3) return "02d";
  if (code <= 48) return "50d";
  if (code <= 67) return "10d";
  if (code <= 77) return "13d";
  if (code <= 99) return "11d";
  return "01d";
};

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const METEO_BASE = "https://api.open-meteo.com/v1/forecast";

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("Ma clé est :", import.meta.env.VITE_WEATHER_API_KEY);

  const fetchWeather = useCallback(
    async (value) => {
      const ville = value.trim();
      if (!ville) return;

      setIsLoading(true);
      setError(null);

      try {
        const geoRes = await fetch(
          `${GEO_URL}?q=${encodeURIComponent(ville)}&limit=1&appid=${apiKey}`,
        );

        if (!geoRes.ok) {
          throw new Error(`Erreur géo : ${geoRes.status}`);
        }

        const geoData = await geoRes.json();

        if (!geoData.length) {
          toast.error("Ville introuvable, vérifie l'orthographe.");
          setWeather(null);
          return;
        }

        const { lat, lon, name, country } = geoData[0];

        const params = new URLSearchParams({
          latitude: lat,
          longitude: lon,
          current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,uv_index",
          hourly: "temperature_2m,weather_code",
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
          forecast_days: 8,
        });

        const meteoRes = await fetch(`${METEO_BASE}?${params}`);

        if (!meteoRes.ok) {
          throw new Error(`Erreur météo : ${meteoRes.status}`);
        }

        const d = await meteoRes.json();
        const cur = d.current;

        setWeather({
          name,
          country,
          temp: Math.round(cur.temperature_2m),
          humidity: cur.relative_humidity_2m,
          ressenti: Math.round(cur.apparent_temperature),
          vent: Math.round(cur.wind_speed_10m),
          indiceUvi: cur.uv_index,
          icon: mapWmoToOpenWeather(cur.weather_code),

          hourly: d.hourly.time.slice(0, 8).map((time, i) => ({
            heure: `${new Date(time).getHours()}h`,
            temp: Math.round(d.hourly.temperature_2m[i]),
            icon: mapWmoToOpenWeather(d.hourly.weather_code[i]),
          })),

          daily: d.daily.time.slice(1, 8).map((time, i) => ({
            jour: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(
              new Date(time),
            ),
            max: Math.round(d.daily.temperature_2m_max[i]),
            min: Math.round(d.daily.temperature_2m_min[i]),
            icon: mapWmoToOpenWeather(d.daily.weather_code[i]),
          })),
        });
      } catch (err) {
        console.error("WeatherProvider error:", err);
        setError(err.message);
        toast.error("Une erreur est survenue, réessaie plus tard.");
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey],
  );

  return (
    <WeatherContext.Provider
      value={{ fetchWeather, weather, isLoading, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;

import { useContext } from "react";
import { WeatherContext } from "../context/Weather";

const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather doit être utilisé sur weatherProvider");
  return context;
};

export default useWeather;

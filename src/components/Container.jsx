/* eslint-disable no-unused-vars */
import React from "react";
import bgMeteo from "../assets/bg-meteo.svg";
import icon01 from "../assets/icon-rain.webp";
import icon03 from "../assets/icon-sunny.webp";
import icon04 from "../assets/icon4.webp";
import icon05 from "../assets/icon-storm.webp";
import icon06 from "../assets/icon-snow.webp";
import icon07 from "../assets/icon-fog.webp";
import useWeather from "../hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

const weatherIcons = {
  "01d": icon03,
  "01n": icon03,
  "02d": icon04,
  "03d": icon04,
  "04d": icon04,
  "09d": icon01,
  "10d": icon01,
  "11d": icon05,
  "13d": icon06,
  "50d": icon07,
};

const LoadingScreen = () => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="flex h-[70vh] flex-col items-center justify-center gap-8 p-4"
  >
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute h-28 w-28 rounded-full bg-blue-500/20"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={icon03}
        alt="Chargement"
        className="w-20 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <motion.div
      className="flex flex-col items-center gap-2 text-center"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-white">
        Récupération des données
        <LoadingDots />
      </h2>
      <p className="text-sm text-gray-400">
        Connexion aux services météo en cours
      </p>
    </motion.div>

    <div className="w-full max-w-md space-y-3">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-10 w-full rounded-xl bg-white/5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

const LoadingDots = () => (
  <span className="ml-1 inline-flex gap-0.5">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="text-blue-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      >
        .
      </motion.span>
    ))}
  </span>
);

const Container = () => {
  const { weather, isLoading } = useWeather();

  if (!weather && !isLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src={icon03}
            alt="Météo"
            className="w-40 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            À la recherche du{" "}
            <span className="text-blue-400">beau temps ?</span>
          </h1>

          <motion.p
            className="mt-4 text-lg text-gray-400 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Entrez une ville pour explorer les prévisions météo.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <div className="h-10 w-1 rounded-full bg-linear-to-b from-blue-500 to-transparent" />
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="weather-data"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-start gap-6 p-4 sm:p-5 lg:flex-row"
      >
        <div className="flex w-full flex-col gap-6 md:gap-8 lg:w-[70%] xl:w-[75%]">
          <div
            style={{ backgroundImage: `url(${bgMeteo})` }}
            className="flex min-h-48 w-full flex-col items-center gap-6 rounded-xl bg-cover bg-center p-6 sm:flex-row sm:justify-between sm:gap-4"
          >
            <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl">
                {weather.name}, {weather.country}
              </h1>
              <h4 className="text-sm font-light text-gray-300 sm:text-base">
                {new Date().toLocaleDateString("FR-fr", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h4>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-7">
              <img
                src={weatherIcons[weather.icon] || icon03}
                className="w-16 sm:w-20"
                alt="icône météo"
              />
              <h1 className="text-6xl font-black sm:text-7xl">
                {weather.temp}°
              </h1>
            </div>
          </div>

          {/* Stats rapides (2 colonnes sur mobile, 4 sur desktop) */}
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {[
              { label: "Humidité", value: `${weather.humidity}%` },
              { label: "Ressenti", value: `${weather.ressenti}°` },
              { label: "Vent", value: `${weather.vent} km/h` },
              { label: "Indice UVI", value: weather.indiceUvi },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="shadow-gay bg-second-bg flex flex-col items-center gap-2 rounded-xl p-4 sm:items-start"
              >
                <h2 className="w-full text-center text-sm text-gray-400 sm:text-left">
                  {label}
                </h2>
                <h4 className="text-xl whitespace-nowrap sm:text-[22px]">
                  {value}
                </h4>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3 overflow-hidden">
            <h1 className="text-md font-medium sm:text-lg">
              Prévisions quotidiennes
            </h1>
            <div className="flex snap-x gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-7">
              {weather.daily.map((day) => (
                <div
                  key={day.jour}
                  className="bg-second-bg shadow-gay flex min-w-20 shrink-0 snap-center flex-col items-center gap-3 rounded-xl p-3 lg:min-w-0"
                >
                  <h2 className="sm:text-md text-sm text-white">{day.jour}</h2>
                  <img
                    src={weatherIcons[day.icon]}
                    alt=""
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  />
                  <div className="flex w-full items-center justify-between gap-2 px-1">
                    <h2 className="text-sm text-gray-400 sm:text-[16px]">
                      {day.max}°
                    </h2>
                    <h2 className="text-sm text-gray-400 sm:text-[16px]">
                      {day.min}°
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-second-bg shadow-gay flex w-full flex-col gap-2 rounded-xl p-4 sm:p-5 lg:h-132 lg:w-[30%] lg:p-3 xl:w-[25%]">
          <div className="flex items-center justify-between">
            <h1 className="poli-text text-md font-medium sm:text-lg">
              Prévision horaire
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {weather.hourly.map((h, index) => (
              <div
                key={index}
                className="bg-items-bg shadow-gay flex items-center justify-between rounded-lg px-2 py-2 lg:px-2 lg:py-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={weatherIcons[h.icon] || icon01}
                    alt="météo"
                    className="w-10 sm:w-12"
                  />
                  <span className="text-sm sm:text-base">{h.heure}</span>
                </div>
                <h2 className="font-medium text-gray-300">{h.temp}°</h2>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Container;

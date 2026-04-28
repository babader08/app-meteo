import React, { useState } from "react";
import useWeather from "../hooks/useWeather";
import toast from "react-hot-toast";

const InputText = () => {
  const [input, setInput] = useState("");
  const { fetchWeather } = useWeather();

  const handleClick = (value) => {
    if (input.trim() === "") {
      toast.error("veuillez saisir votre ville ou pays");
      return;
    }
    fetchWeather(value);
    setInput("");
  };

  return (
    <div className="main-container mx-auto mt-4 flex w-full max-w-2xl items-center gap-2 px-4 sm:gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // J'ai corrigé "setIpnut" en "setInput"
        placeholder="Chercher un endroit..."
        className="bg-second-bg h-12 flex-1 rounded-xl px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <button
        onClick={() => handleClick(input)}
        className="bg-btn-bg h-12 cursor-pointer rounded-xl px-6 font-bold whitespace-nowrap transition-transform hover:scale-105 active:scale-95 sm:px-8"
      >
        Chercher
      </button>
    </div>
  );
};

export default InputText;

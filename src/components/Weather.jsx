import React, { useEffect, useState, useRef } from "react";
import humidity from "../assets/humidity.svg";
import wind from "../assets/wind.svg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const inputRef = useRef();

  const search = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_APP_ID
    }`;
    let response = await fetch(url);
    let data = await response.json();
    setWeatherData({
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      speed: data.wind.speed,
      city: data.name,
      temp: Math.floor(data.main.temp),
    });
  };
  useEffect(() => {
    search("Tirunelveli");
  }, []);

  const handleClick = () => {
    search(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <div className="text-white bg-teal-700 py-8 px-6 my-16 mx-4 sm:p-10 sm:m-20 rounded-xl flex flex-col items-center shadow-lg shadow-slate-400">
      <div className="flex gap-3 flex-wrap justify-center">
        <input
          type="text"
          ref={inputRef}
          className="rounded-lg outline-none px-4 py-2 text-l text-black font-semibold"
        />
        <button
          onClick={handleClick}
          className=" px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col items-center mt-5 mb-8 font-bold">
        <img
          className="w-28"
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="weather condition"
        />
        <h2 className="text-3xl sm:text-4xl">{weatherData.temp}°C</h2>
        <h3 className="text-2xl sm:text-3xl">{weatherData.city}</h3>
      </div>
      <div className="flex gap-5 flex-col sm:flex-row sm:gap-10 mt-5">
        <div className="flex items-center">
          <img
            className="w-12 sm:w-14 brightness-0 invert"
            src={humidity}
            alt="humidity"
          />
          <div className="font-bold ">
            <p>{weatherData.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-12 sm:w-14 brightness-0 invert m-2"
            src={wind}
            alt="wind"
          />
          <div className="font-bold">
            <p>{weatherData.speed} Km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

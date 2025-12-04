import React, { useEffect, useState } from "react";

const API_KEY = "88bbfd6f2aa098d4eb61c6c3537fd7eb";

const Weather = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get accurate location using IP
  const getLocation = async () => {
    const res = await fetch("https://ipapi.co/json/");
    return await res.json();
  };

  // Fetch current weather
  const getCurrentWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return await res.json();
  };

  // Fetch 5-day forecast (3-hour data)
  const getForecast = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return await res.json();
  };

  // Convert 3-hour intervals → daily summary
  const summarizeForecast = (list) => {
    const daily = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) {
        daily[date] = {
          temp: [],
          rain: [],
          icon: item.weather[0].icon,
        };
      }

      daily[date].temp.push(item.main.temp);
      daily[date].rain.push(item.pop);
    });

    return Object.entries(daily).slice(0, 5).map(([date, info]) => ({
      date,
      temp: Math.round(
        info.temp.reduce((a, b) => a + b, 0) / info.temp.length
      ),
      rain: Math.round(
        (info.rain.reduce((a, b) => a + b, 0) / info.rain.length) * 100
      ),
      icon: info.icon,
    }));
  };

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const loc = await getLocation();
        setLocation(loc);

        const currentData = await getCurrentWeather(loc.latitude, loc.longitude);
        setCurrent(currentData);

        const forecastData = await getForecast(loc.latitude, loc.longitude);
        setForecast(summarizeForecast(forecastData.list));

        setLoading(false);
      } catch (err) {
        setError("Failed to load weather");
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) return <div className="p-8">Loading weather...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Weather Dashboard</h1>

      {/* CURRENT WEATHER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {location.city}, {location.region}
        </h2>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold text-green-700">
              {current.main.temp}°C
            </p>
            <p className="text-gray-600">{current.weather[0].description}</p>
            <p className="text-sm text-gray-500">Humidity: {current.main.humidity}%</p>
            <p className="text-sm text-gray-500">Wind: {current.wind.speed} m/s</p>
          </div>

          <img
            className="w-20"
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          />
        </div>
      </div>

      {/* 5-DAY FORECAST */}
      <h2 className="text-xl font-bold text-green-700 mb-2">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, i) => (
          <div key={i} className="bg-white p-4 rounded-xl text-center shadow">
            <p className="font-semibold">
              {new Date(day.date).toLocaleDateString("en-IN", {
                weekday: "short",
              })}
            </p>
            <img
              className="w-12 mx-auto"
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
            />
            <p className="text-green-700 font-bold">{day.temp}°C</p>
            <p className="text-blue-600 text-sm">Rain: {day.rain}%</p>
          </div>
        ))}
      </div>

      {/* AGRO ADVISORY */}
      <div className="bg-green-50 p-6 mt-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold text-green-700 mb-3">🌾 Agro Advisory</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Avoid irrigation if rain chance &gt; 50%.</li>
          <li>Do not spray pesticides during high wind.</li>
          <li>High humidity increases fungal risk.</li>
          <li>Use early morning for fertilizers.</li>
        </ul>
      </div>
    </div>
  );
};

export default Weather;

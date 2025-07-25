import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const API_KEY = 'fcc8de7015bbb202209bbf0261babf4c';

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      let weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );

      if (weatherRes.status === 404) {
        weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()},IN&appid=${API_KEY}&units=metric`
        );
      }

      const weatherData = await weatherRes.json();

      if (weatherRes.ok) {
        setWeather(weatherData);
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()},IN&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastRes.json();
        if (forecastRes.ok) setForecast(forecastData);
      } else {
        setError(weatherData.message || 'City not found. Try "Varanasi,IN" or "Prayagraj,IN"');
      }
    } catch (err) {
      setError('Failed to connect to weather service');
    }
    setLoading(false);
  };

  const getCityAliases = (cityName) => {
    const aliases = {
      'varanasi': ['Banaras', 'Kashi', 'Varanasi,IN'],
      'prayagraj': ['Allahabad', 'Prayagraj,IN'],
      'mumbai': ['Bombay'],
      'chennai': ['Madras']
    };
    return aliases[cityName.toLowerCase()] || [];
  };

  return (
    <div className="weather-app">
      <div className="weather-container bg-cyan-400 p-3 sm:p-5 w-[90vw] sm:w-[50vw] max-h-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">🌦️ Weather App</h1>
        
        <div className='mt-3'>
          <WeatherForm 
            city={city}
            setCity={setCity}
            loading={loading}
            fetchWeatherData={fetchWeatherData}
          />
        </div>
        
        <WeatherDisplay 
          loading={loading}
          error={error}
          weather={weather}
          forecast={forecast}
          currentTime={currentTime}
          cityAliases={getCityAliases(city)}
          setCity={setCity}
          fetchWeatherData={fetchWeatherData}
        />
        
        <p className="text-xs text-gray-700 mt-4 text-center">
          Weather data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;
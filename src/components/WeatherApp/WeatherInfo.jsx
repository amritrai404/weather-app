import React from 'react';

const WeatherInfo = ({ weather, currentTime, formatDate, formatTime }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-gray-600">{formatDate(currentTime)}</p>
          <p className="text-gray-600">{formatTime(currentTime)}</p>
        </div>
        <div className="flex items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <p className="text-4xl ml-2">{Math.round(weather.main.temp)}°C</p>
        </div>
      </div>
      
      <p className="capitalize text-gray-600 text-center mb-4">
        {weather.weather[0].description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="bg-white bg-opacity-70 p-2 rounded">
          <p>Feels Like</p>
          <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="bg-white bg-opacity-70 p-2 rounded">
          <p>Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white bg-opacity-70 p-2 rounded">
          <p>Wind Speed</p>
          <p className="font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-white bg-opacity-70 p-2 rounded">
          <p>Pressure</p>
          <p className="font-semibold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </>
  );
};

export default WeatherInfo;
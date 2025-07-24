import React from 'react';
import WeatherInfo from './WeatherInfo';
import WeatherForecast from './WeatherForecast';

const WeatherDisplay = ({ 
  loading, 
  error, 
  weather, 
  forecast, 
  currentTime, 
  cityAliases,
  setCity,
  fetchWeatherData
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <p>Loading weather data...</p>
          <div className="animate-pulse flex justify-center mt-2">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center p-3 bg-red-50 rounded">
          {error}
          {cityAliases.length > 0 && (
            <div className="mt-2 text-sm">
              <p>Try these names:</p>
              <div className="flex gap-2 justify-center mt-1">
                {cityAliases.map((alias, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCity(alias);
                      setTimeout(() => fetchWeatherData(), 100);
                    }}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
                  >
                    {alias}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {weather && (
        <div className="mt-4">
          <WeatherInfo 
            weather={weather} 
            currentTime={currentTime} 
            formatDate={formatDate} 
            formatTime={formatTime} 
          />
          {forecast && <WeatherForecast forecast={forecast} />}
        </div>
      )}
    </>
  );
};

export default WeatherDisplay;
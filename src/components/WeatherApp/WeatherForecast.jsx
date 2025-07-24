import React from 'react';

const WeatherForecast = ({ forecast }) => {
  const getDailyForecast = () => {
    const dailyForecast = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date: new Date(item.dt * 1000),
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        };
      } else {
        dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, item.main.temp_min);
        dailyForecast[date].temp_max = Math.max(dailyForecast[date].temp_max, item.main.temp_max);
      }
    });
    return Object.values(dailyForecast).slice(0, 5);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {getDailyForecast().map((day, index) => (
          <div key={index} className="bg-white bg-opacity-70 p-3 rounded text-center">
            <p className="font-medium">
              {day.date.toLocaleDateString('en-IN', { weekday: 'short' })}
            </p>
            <p className="text-sm text-gray-600">
              {day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className="mx-auto w-10 h-10"
            />
            <p className="capitalize text-xs text-gray-600">{day.description}</p>
            <p className="text-sm">
              <span className="font-semibold">{Math.round(day.temp_max)}°</span> /{' '}
              <span className="text-gray-600">{Math.round(day.temp_min)}°</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
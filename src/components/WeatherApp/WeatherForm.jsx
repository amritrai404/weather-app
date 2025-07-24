import React from 'react';

const WeatherForm = ({ city, setCity, loading, fetchWeatherData }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 p-2 rounded bg-white bg-opacity-90"
        placeholder="Enter city (e.g., Varanasi, Prayagraj)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={fetchWeatherData}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default WeatherForm;
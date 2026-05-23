import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'a86985f88ee1003b68499a07a1f354bf';

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="weather-card">
        <h1>☁️ Weather App</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>City Name: {weather.city}</h2>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

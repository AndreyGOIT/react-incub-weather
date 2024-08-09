import React, { useState } from 'react';
import './App.css';
import  Weather  from './components/Weather';

function App() {
const [city, setCity] = useState<string>('Minsk');
const [error, setError] = useState<string | null>(null);
const [weatherData, setWeatherData] = useState<{temp: number, description: string} | null>(null);
// console.log(error);
// console.log(weatherData);

  const fetchWeather = () => {
    const apiKey = '7499e9f0cfd6cb862a73f272fd17492b';
    //
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          setError('City not found');
          setWeatherData(null);
        } else {
          setWeatherData({temp: json.main.temp , description: json.weather[0].description});
          setError(null);
          console.log(json);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
        setWeatherData(null);
      });
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" onChange={(e) => setCity(e.currentTarget.value) } placeholder="Enter city name" />
      <button onClick={fetchWeather}>Get weather</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {weatherData && <Weather temp={weatherData.temp} description={weatherData.description} />}
    </div>
  );
}

export default App;

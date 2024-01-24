import React from 'react';
import sunnyBackground from './assets/sunny-background.jpg';
import rainyBackground from './assets/rainy-background.jpg';
import cloudyBackground from './assets/cloudy-background.jpg';
import mistyBackground from './assets/misty-background.jpg';
import snowyBackground from './assets/snowy-background.jpg';
import { Link } from 'react-router-dom'; // Importa Link da React Router se stai utilizzando React Router
import '../styles/styles.css';

const WeatherBackground = ({ city, condition, temperature, coordinates, pressure, humidity, windSpeed, onBackToHome }) => {
  let background;

  // Usa uno statement switch per selezionare l'immagine di sfondo in base alle condizioni meteorologiche
  switch (condition) {
    case 'Clear':
      background = `url(${sunnyBackground})`;
      break;
    case 'Rain':
      background = `url(${rainyBackground})`;
      break;
    case 'Clouds':
      background = `url(${cloudyBackground})`;
      break;
    case 'Mist':
      background = `url(${mistyBackground})`;
      break;
    case 'Snow':
      background = `url(${snowyBackground})`;
      break;
    default:
      background = `url(${sunnyBackground})`;
  }

  return (
    <div className="weather-background-container" style={{ backgroundImage: background }}>
    {/* Elemento per lo sfondo scuro trasparente */}
    <div className="dark-overlay"></div>
    <div className="weather-overlay">
      {/* Mostra le informazioni meteorologiche sull'overlay */}
      <p>{city}</p>
      <p>Temperature: {temperature.toFixed(1)}°C</p>
      <p>Condition: {condition}</p>
      <p>Coordinates: {coordinates.lat}, {coordinates.lon}</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
    </div>
    {/* Utilizza il componente Link per gestire il collegamento alla home */}
    <Link to="/" className="weather-back-to-home">
      Back to Home
    </Link>
  </div>
  );
};

export default WeatherBackground;

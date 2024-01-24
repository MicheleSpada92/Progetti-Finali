// WeatherDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import WeatherBackground from './WeatherBackground';
import '../styles/styles.css';

const WeatherDetails = () => {
  // Estrai il parametro 'city' dalla URL usando 'useParams'
  const { city } = useParams();
  // Stato per memorizzare i dati meteorologici
  const [weatherData, setWeatherData] = useState(null);

  // Effetto collaterale che si attiva quando il valore di 'city' cambia
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ottieni le coordinate dalla stringa 'city'
        const coordinates = city.split(',');
        if (coordinates.length === 2) {
          const [lat, lon] = coordinates;
          // Effettua la richiesta API per ottenere i dati meteorologici
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a11493a94d9eba324c189acbee61d73`
          );
          // Aggiorna lo stato con i dati ottenuti dalla risposta
          setWeatherData(response.data);
        } else {
          // Gestisci il formato non valido delle coordinate
          console.error('Invalid coordinates format:', city);
        }
      } catch (error) {
        // Gestisci gli errori durante la richiesta API
        console.error('Error fetching data', error);
      }
    };

    // Chiama la funzione fetchData quando il componente monta o 'city' cambia
    fetchData();
  }, [city]);

  // Funzione per convertire la temperatura da Kelvin a Celsius
  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Rendering del componente WeatherDetails
  return (
    <div className="weather-details-container">
      {weatherData && (
        <div className="weather-background">
          {/* Componente WeatherBackground per mostrare le informazioni meteorologiche e lo sfondo */}
          <WeatherBackground
            city={weatherData.name}
            condition={weatherData.weather[0].main}
            temperature={convertKelvinToCelsius(weatherData.main.temp)}
            coordinates={{ lat: weatherData.coord.lat, lon: weatherData.coord.lon }}
            pressure={weatherData.main.pressure}
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;

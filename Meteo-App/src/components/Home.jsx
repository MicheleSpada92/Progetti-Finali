// Home.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Importa il file CSS
 

const API_KEY = '7a11493a94d9eba324c189acbee61d73';

const Home = () => {
  // Stato per gestire il valore della città nell'input
  const [city, setCity] = useState('');
  // Hook di navigazione da 'react-router-dom' per reindirizzare a una nuova pagina
  const navigate = useNavigate();

  // Funzione per gestire la navigazione ai dettagli meteo
  const handleWeatherDetails = async (lat, lon) => {
    navigate(`/weather/${lat},${lon}`);
  };

  // Funzione per gestire l'invio del modulo (ricerca del meteo)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Richiesta per ottenere le coordinate geografiche della città
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      if (geoResponse.data && geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];

        // Richiesta per ottenere i dati meteorologici basati sulle coordinate geografiche
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        console.log('Weather Forecast:', weatherResponse.data);

        // Naviga ai dettagli meteo con le coordinate ottenute
        handleWeatherDetails(lat, lon);
      } else {
        alert('No data found for the entered city. Please try with another city.');
      }
    } catch (error) {
      console.error('Error fetching data', error);

      // Gestione degli errori durante le richieste API
      if (error.response && error.response.status === 404) {
        alert('City not found. Please enter a valid city.');
      } else {
        alert('Error fetching weather data. Please try again later.');
      }
    }
  };

  // Rendering del componente Home
  return (
    <div className="home-container">
      <div className="form-container">
        <div className="app-name">-Weather App-</div>
        {/* Form per la ricerca del meteo */}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            {/* Input per l'inserimento del nome della città */}
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* Bottone per avviare la ricerca del meteo */}
          <button type="submit">Get Weather</button>
        </form>
      </div>
    </div>
  );
};

// Esporta il componente Home come predefinito
export default Home;

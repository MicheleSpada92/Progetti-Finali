// ShortTermForecast.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShortTermForecast = ({ city }) => {
  // Stato per memorizzare i dati del forecast
  const [forecast, setForecast] = useState([]);

  // Effetto collaterale che si attiva quando il valore di 'city' cambia
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Ottieni le coordinate dalla stringa 'city'
        const coordinates = city.split(',');
        if (coordinates.length === 2) {
          const [lat, lon] = coordinates;

          // Effettua la richiesta API per ottenere il forecast a breve termine
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7a11493a94d9eba324c189acbee61d73`
          );

          // Aggiorna lo stato con i dati ottenuti dalla risposta
          setForecast(response.data.list);
        } else {
          // Gestisci il formato non valido delle coordinate
          console.error('Invalid coordinates format:', city);
        }
      } catch (error) {
        // Gestisci gli errori durante la richiesta API
        console.error('Error fetching forecast', error);
      }
    };

    // Chiama la funzione fetchForecast quando il componente monta o 'city' cambia
    fetchForecast();
  }, [city]);

  // Rendering del componente ShortTermForecast
  return (
    <div>
      <h3>Short Term Forecast</h3>
      {/* Mappa sui dati del forecast per mostrarli nel componente */}
      {forecast.map((item) => (
        <div key={item.dt}>
          <p>{item.dt_txt}</p>
          <p>Temperature: {item.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default ShortTermForecast;

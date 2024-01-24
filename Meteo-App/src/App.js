// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    // Definizione delle rotte dell'applicazione
    <Routes>
      {/* Rotta per la homepage */}
      <Route path="/" element={<Home />} />

      {/* Rotta per i dettagli meteo di una città specifica */}
      <Route path="/weather/:city" element={<WeatherDetails />} />
    </Routes>
  );
}

export default App;

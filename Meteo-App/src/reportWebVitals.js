// Funzione reportWebVitals che riceve una callback onPerfEntry per gestire le metriche di prestazione
const reportWebVitals = onPerfEntry => {
  // Verifica se onPerfEntry è una funzione prima di procedere
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importa le funzioni di misurazione delle prestazioni da 'web-vitals'
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Chiamate alle funzioni di misurazione delle prestazioni con la callback fornita
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Esporta la funzione reportWebVitals come modulo predefinito
export default reportWebVitals;

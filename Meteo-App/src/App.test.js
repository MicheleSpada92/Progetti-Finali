// App.test.js

// Importa le utility di testing da @testing-library/react
import { render, screen } from '@testing-library/react';
// Importa MemoryRouter per la gestione delle rotte nei test
import { MemoryRouter } from 'react-router-dom';
// Importa il componente principale dell'applicazione
import App from './App';

// Test per verificare se il componente principale dell'app viene renderizzato correttamente
test('renders the main App component', () => {
  // Rende il componente App all'interno di MemoryRouter per simulare la navigazione
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Cerca un elemento nel DOM tramite un attributo data-testid
  const appElement = screen.getByTestId('app-main');

  // Verifica che l'elemento sia presente nel DOM
  expect(appElement).toBeInTheDocument();
});

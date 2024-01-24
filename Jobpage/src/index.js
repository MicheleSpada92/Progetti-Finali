import React from 'react';
import { createRoot } from 'react-dom/client'; // Update the import statement
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';

const root = document.getElementById('root');
const rootInstance = createRoot(root);

rootInstance.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

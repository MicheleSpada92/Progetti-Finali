// store/index.jsx
import { createStore } from 'redux';
import rootReducer from '../reducers'; // Assicurati che l'estensione sia corretta (.js, .jsx, ecc.)

const store = createStore(rootReducer);

export default store;

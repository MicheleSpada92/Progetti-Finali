import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./components/MainSearch";
import CompanySearchResults from "./components/CompanySearchResults";
import Favorites from "./components/Favorites";
import FavoritesPage from "./components/FavoritesPage";  // Importa il componente FavoritesPage
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/:company" element={<CompanySearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites-page" element={<FavoritesPage />} />  {/* Aggiungi questa rotta per FavoritesPage */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

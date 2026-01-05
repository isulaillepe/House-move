import { useState } from 'react';
// 👇 CHANGE 1: Import HashRouter instead of BrowserRouter
import { HashRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import NavBar from './components/NavBar';
import propertyData from './properties.json'; 
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (property) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, property]);
      alert(`${property.location} added to favorites!`);
    } else {
      alert("This property is already in your favorites.");
    }
  };

  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(updatedFavorites);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    // 👇 CHANGE 2: Use <HashRouter> here.
    // It automatically handles the "/House-move/" folder for you.
    <HashRouter>
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={
            <SearchPage 
              properties={propertyData.properties} 
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              clearFavorites={clearFavorites}
            />
          } 
        />
        <Route 
          path="/property/:id" 
          element={
            <PropertyPage 
              properties={propertyData.properties} 
              addToFavorites={addToFavorites} 
            />
          } 
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
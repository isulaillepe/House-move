import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import NavBar from './components/NavBar';
import propertyData from './properties.json'; 
import './App.css';

function App() {
  // STATE: Favorites list
  const [favorites, setFavorites] = useState([]);

  // LOGIC: Add to favorites
  const addToFavorites = (property) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, property]);
      alert(`${property.location} added to favorites!`);
    } else {
      alert("This property is already in your favorites.");
    }
  };

  // LOGIC: Remove from favorites
  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(updatedFavorites);
  };

  // LOGIC: Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <>
      {/* NavBar shows on all pages */}
      <NavBar />

      <Routes>
        {/* Home Page */}
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

        {/* Property Details Page */}
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
    </>
  );
}

export default App;
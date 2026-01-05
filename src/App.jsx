import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import NavBar from './components/NavBar';
import propertyData from './properties.json'; 
import './App.css';

function App() {
  // STATE: This holds the list of favorite properties. 
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
    // 👇 FIX APPLIED HERE: Added the future flags object
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {/* The NavBar is outside Routes so it shows on EVERY page */}
      <NavBar />

      <Routes>
        {/* Route 1: The Search Page (Home) */}
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

        {/* Route 2: The Property Details Page */}
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
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import NavBar from './components/NavBar';
import propertyData from './properties.json'; // Make sure this matches your file name
import './App.css';

function App() {
  // STATE: This holds the list of favorite properties. 
  // We keep it here (at the top level) so it persists across pages.
  const [favorites, setFavorites] = useState([]);

  // LOGIC: Add to favorites
  // Requirement: Ensure each property can only be added once 
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
  // Requirement: Remove a property from the favorite list [cite: 48]
  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(updatedFavorites);
  };

  // LOGIC: Clear all favorites
  // Requirement: Clear the favorite list [cite: 48]
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <BrowserRouter>
      {/* The NavBar is outside Routes so it shows on EVERY page */}
      <NavBar />

      <Routes>
        {/* Route 1: The Search Page (Home) */}
        {/* We pass the 'properties' data and all favorite functions down as props */}
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
        {/* The ':id' is a variable we can read inside PropertyPage to know which house to show */}
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








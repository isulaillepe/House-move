import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import NavBar from './components/NavBar';
import propertyData from './properties.json'; // Ensure this matches your JSON filename
import './App.css';

function App() {
  // STATE: This holds the list of favorite properties.
  // We keep it here (at the top level) so the data persists when you switch pages.
  const [favorites, setFavorites] = useState([]);

  // LOGIC: Add to favorites
  // Requirement: Ensure each property can only be added once [cite: 47, 130]
  const addToFavorites = (property) => {
    // Check if the property is already in the list to prevent duplicates
    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, property]);
      alert(`${property.location} has been added to your favorites!`);
    } else {
      alert("This property is already in your favorites.");
    }
  };

  // LOGIC: Remove from favorites
  // Requirement: Allow removing specific items [cite: 48, 131]
  const removeFromFavorites = (propertyId) => {
    // Filter out the item with the matching ID
    const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(updatedFavorites);
  };

  // LOGIC: Clear all favorites
  // Requirement: Button to clear the entire list [cite: 48, 134]
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <BrowserRouter>
      {/* The NavBar is outside Routes so it remains visible on every page */}
      <NavBar />

      <Routes>
        {/* Route 1: The Search Page (Home) */}
        {/* We pass all the logic down as "props" so the SearchPage can use it */}
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
        {/* The ':id' is a parameter we use to identify which house to show */}
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
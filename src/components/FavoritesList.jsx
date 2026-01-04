import { useState } from 'react';
import './FavoritesList.css'; 

// IMPORTANT: We need addToFavorites here to handle the DROP action
function FavoritesList({ favorites, removeFromFavorites, clearFavorites, addToFavorites }) {
  
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // HANDLER: Allow dropping (Default is to block dropping)
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    setIsDraggingOver(true); // Visual cue
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  // HANDLER: When the property is dropped onto this list
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    // Retrieve the data we packed in PropertyCard
    const data = e.dataTransfer.getData("application/json");
    
    if (data) {
      const property = JSON.parse(data);
      addToFavorites(property); // Call the main App function
    }
  };

  return (
    <div 
      className={`favorites-box ${isDraggingOver ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3>My Favorites</h3>
      <p className="instruction">Drag properties here</p>

      {favorites.length === 0 && <p className="empty-msg">No favorites yet...</p>}

      <ul className="fav-list">
        {favorites.map(fav => (
          <li key={fav.id} className="fav-item">
            <img src={fav.picture} alt="thumb" />
            <div className="fav-info">
                <span>{fav.location}</span>
                <span className="fav-price">£{fav.price.toLocaleString()}</span>
            </div>
            {/* REQUIREMENT: Button to remove */}
            <button 
                onClick={() => removeFromFavorites(fav.id)} 
                className="remove-btn"
            >
                &times;
            </button>
          </li>
        ))}
      </ul>

      {favorites.length > 0 && (
        <button onClick={clearFavorites} className="clear-btn">
          Clear All Favorites
        </button>
      )}
    </div>
  );
}

export default FavoritesList;
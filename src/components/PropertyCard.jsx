import { Link } from 'react-router-dom';
import './PropertyCard.css'; 

function PropertyCard({ property, addToFavorites }) {
  
  // HANDLER: When the user starts dragging this card
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div 
      className="property-card"
      draggable="true"             
      onDragStart={handleDragStart} 
    >
      <div className="card-ximage-container">
        {/* ✅ UPDATE: Uses the first image from the folder as the thumbnail */}
        <img 
          src={property.images[0]} 
          alt={property.type} 
          onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <div className="status-tag">For Sale</div>
      </div>
      
      <div className="card-content">
        <h3>{property.location}</h3>
        
        {/* Currency set to LKR */}
        <p className="price">LKR {property.price.toLocaleString()}</p>
        
        <p className="desc">{property.description.substring(0, 80)}...</p>
        
        <div className="card-actions">
          <Link to={`/property/${property.id}`} className="view-btn">View Details</Link>
          
          <button 
            className="fav-btn" 
            onClick={() => addToFavorites(property)}
            title="Add to Favorites"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
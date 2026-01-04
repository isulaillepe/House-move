import { Link } from 'react-router-dom';
import './PropertyCard.css'; // We'll create this small CSS file next

function PropertyCard({ property, addToFavorites }) {
  
  // HANDLER: When the user starts dragging this card
  const handleDragStart = (e) => {
    // We attach the property data (as a string) to the drag event
    e.dataTransfer.setData("application/json", JSON.stringify(property));
    // Visual effect: indicates we are "copying" the item
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div 
      className="property-card"
      draggable="true"             // 1. Make the element draggable
      onDragStart={handleDragStart} // 2. Attach the data
    >
      <div className="card-image-container">
        <img src={property.picture} alt={property.type} />
        <div className="status-tag">For Sale</div>
      </div>
      
      <div className="card-content">
        <h3>{property.location}</h3>
        <p className="price">£{property.price.toLocaleString()}</p>
        <p className="desc">{property.description.substring(0, 80)}...</p>
        
        <div className="card-actions">
          <Link to={`/property/${property.id}`} className="view-btn">View Details</Link>
          
          {/* REQUIREMENT: Button to add to favorites */}
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
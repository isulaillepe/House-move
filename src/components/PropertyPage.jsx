import React from 'react';
import { useParams, Link } from 'react-router-dom';

function PropertyPage({ properties, addToFavorites }) {
  const { id } = useParams();

  // 🔍 DEBUG: Check the console to see what is being compared
  console.log("URL ID:", id);
  console.log("First Property ID in Data:", properties[0]?.id);

  // FIX: specific for "prop1" style IDs. We do NOT use Number() here.
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Property not found!</h2>
        <p>Looking for ID: <strong>{id}</strong></p>
        <Link to="/" style={{ color: '#2c3e50', textDecoration: 'underline' }}>
          Return to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>
        ← Back to Search
      </Link>

      <div style={{ marginTop: '20px' }}>
        <h1 style={{ color: '#2c3e50' }}>{property.location}</h1>
        <h2 style={{ color: '#27ae60' }}>{property.price}</h2>
      </div>

      <div style={{ marginTop: '20px' }}>
        <img 
          src={property.picture} 
          alt={property.type} 
          style={{ 
            width: '100%', 
            maxHeight: '400px', 
            objectFit: 'cover', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
          }} 
        />
      </div>

      <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          {property.description}
        </p>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', color: '#555' }}>
          <span><strong>🏠 Type:</strong> {property.type}</span>
          <span><strong>🛏️ Bedrooms:</strong> {property.bedrooms}</span>
        </div>

        <button 
          onClick={() => addToFavorites(property)}
          style={{
            marginTop: '25px',
            padding: '12px 24px',
            background: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
}

export default PropertyPage;
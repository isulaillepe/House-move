import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function PropertyPage({ properties, addToFavorites }) {
  const { id } = useParams();
  
  // 1. Find the property
  const property = properties.find(p => String(p.id) === String(id));

  // 2. STATE: Track which image is currently big (The "Main" one)
  const [selectedImage, setSelectedImage] = useState("");

  // 3. EFFECT: When the page loads, make the first image the main one
  useEffect(() => {
    // Safety check: specific for your case where some props have 5 images, some have 8
    if (property && property.images && property.images.length > 0) {
      setSelectedImage(property.images[0]);
    }
  }, [property]);

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Property not found!</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Navigation */}
      <Link to="/" style={{ textDecoration: 'none', color: '#666', marginBottom: '15px', display: 'inline-block' }}>
        ← Back to Search
      </Link>

      {/* Title & Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>{property.location}</h1>
          <p style={{ margin: '5px 0', color: '#7f8c8d' }}>{property.type} • {property.tenure}</p>
        </div>
        <h2 style={{ color: '#27ae60', margin: 0 }}>LKR {property.price.toLocaleString()}</h2>
      </div>

      {/* 📸 GALLERY SECTION */}
      <div className="gallery-container">
        
        {/* A. The Main Large Image */}
        <div style={{ 
            width: '100%', 
            height: '500px', 
            backgroundColor: '#f1f1f1', 
            borderRadius: '10px', 
            overflow: 'hidden', 
            marginBottom: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <img 
                src={selectedImage} 
                alt="Main View" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => e.target.src = "https://placehold.co/800x600?text=No+Image"}
            />
        </div>

        {/* B. The Thumbnail Menu */}
        {/* 'overflowX: auto' handles your 5 vs 8 photos requirement automatically */}
        <div style={{ 
            display: 'flex', 
            gap: '12px', 
            overflowX: 'auto', 
            paddingBottom: '10px',
            scrollbarWidth: 'thin' // Makes scrollbar thinner on Firefox
        }}>
            {/* The '?' checks if images exist before trying to map them */}
            {property.images && property.images.map((img, index) => (
                <img 
                    key={index}
                    src={img}
                    alt={`Preview ${index}`}
                    onClick={() => setSelectedImage(img)}
                    style={{ 
                        minWidth: '100px', // Ensures images don't shrink too much
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: selectedImage === img ? '3px solid #3498db' : '2px solid transparent',
                        opacity: selectedImage === img ? 1 : 0.6,
                        transition: 'all 0.2s ease'
                    }}
                />
            ))}
        </div>
      </div>
      {/* ------------------------------------------- */}

      {/* Tabs Section */}
      <div style={{ marginTop: '30px' }}>
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', lineHeight: '1.6' }}>
              <p>{property.description}</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '30px', fontWeight: 'bold', color: '#555' }}>
                  <span>🛏️ {property.bedrooms} Bedrooms</span>
                  <span>📅 Added: {property.added.month} {property.added.year}</span>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div style={{ textAlign: 'center', padding: '20px', background: '#fff', border: '1px solid #eee' }}>
              <img 
                src={property.floorPlan} 
                alt="Floor Plan" 
                style={{ maxWidth: '100%', maxHeight: '500px' }}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = "No Floor Plan Available";
                }}
              />
            </div>
          </TabPanel>

          <TabPanel>
             <div style={{ height: '400px', width: '100%', background: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
              {/* Fixed the map URL to ensure it works properly */}
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              ></iframe>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      {/* Add to Favorites Button */}
      <button 
        onClick={() => addToFavorites(property)}
        style={{
          marginTop: '30px',
          width: '100%',
          padding: '16px',
          background: '#e74c3c', 
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => e.target.style.background = '#c0392b'}
        onMouseOut={(e) => e.target.style.background = '#e74c3c'}
      >
        ❤️ Add to Favorites
      </button>
    </div>
  );
}

export default PropertyPage;
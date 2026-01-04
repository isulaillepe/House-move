import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PropertyPage.css';

function PropertyPage({ properties, addToFavorites }) {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [mainImage, setMainImage] = useState(property ? property.picture : '');

  if (!property) return <div className="container"><h2>Property not found</h2></div>;

  return (
    <div className="container property-page">
      {/* 1. IMAGE GALLERY */}
      <div className="gallery-section">
        <div className="main-image-frame">
          <img src={mainImage} alt="Main view" />
        </div>
        <div className="thumbnail-row">
          {property.images && property.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`View ${idx}`} 
              onClick={() => setMainImage(img)}
              className={mainImage === img ? 'active-thumb' : ''}
            />
          ))}
        </div>
      </div>

      {/* 2. DETAILS & TABS */}
      <div className="details-section">
        <div className="header-info">
          <h1>{property.location}</h1>
          <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
          <p className="meta">{property.type} • {property.bedrooms} Bedrooms • {property.tenure}</p>
          <button className="add-fav-btn" onClick={() => addToFavorites(property)}>
            ♥ Add to Favorites
          </button>
        </div>

        <Tabs className="custom-tabs">
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h3>Property Description</h3>
              <p>{property.description}</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="tab-content">
              <div className="placeholder-box">Floor Plan Image Placeholder</div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              {/* Google Map Embed (Using Property Location) */}
              <iframe 
                width="100%" 
                height="300" 
                style={{border:0}}
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
              ></iframe>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyPage;
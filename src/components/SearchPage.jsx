import { useState } from 'react';
import PropertyCard from './PropertyCard';
import FavoritesList from './FavoritesList';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './SearchPage.css'; 

function SearchPage({ properties, favorites, addToFavorites, removeFromFavorites, clearFavorites }) {
  // STATE: Search Filters
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 200000000, // ✅ FIX 1: Increased to 200 Million for LKR prices
    minBedrooms: 0,
    maxBedrooms: 10,
    postcode: '',
    dateAfter: null, 
    dateBefore: null 
  });

  // HELPER: Convert JSON date object to JS Date
  const getPropertyDate = (added) => {
    const months = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    return new Date(added.year, months[added.month], added.day);
  };

  // LOGIC: The Master Filter
  const filteredProperties = properties.filter(prop => {
    const propDate = getPropertyDate(prop.added);
    const filterDateAfter = filters.dateAfter;
    const filterDateBefore = filters.dateBefore;

    // 1. Type Check (Added Villa support)
    const typeMatch = filters.type === 'any' || prop.type === filters.type;

    // 2. Price Check (Min & Max)
    const priceMatch = prop.price >= filters.minPrice && prop.price <= filters.maxPrice;

    // 3. Bedrooms Check (Min & Max)
    const bedroomsMatch = prop.bedrooms >= filters.minBedrooms && prop.bedrooms <= filters.maxBedrooms;

    // 4. Postcode Check
    const postcodeMatch = filters.postcode === '' || prop.location.toLowerCase().includes(filters.postcode.toLowerCase());

    // 5. Date Added Check
    const dateAfterMatch = !filterDateAfter || propDate >= filterDateAfter;
    const dateBeforeMatch = !filterDateBefore || propDate <= filterDateBefore;

    return typeMatch && priceMatch && bedroomsMatch && postcodeMatch && dateAfterMatch && dateBeforeMatch;
  });

  // HANDLER: Clear all filters
  const clearFilters = () => {
    setFilters({
      type: 'any',
      minPrice: 0,
      maxPrice: 200000000, // ✅ Resetting to 200 Million
      minBedrooms: 0,
      maxBedrooms: 10,
      postcode: '',
      dateAfter: null,
      dateBefore: null
    });
  };

  return (
    <div className="search-page-container">
      
      {/* SECTION 1: SEARCH FORM */}
      <aside className="search-sidebar">
        <h3>Filter Properties</h3>
        
        <div className="form-group">
          <label>Property Type</label>
          <select 
            value={filters.type} 
            onChange={e => setFilters({...filters, type: e.target.value})}
            className="search-input"
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Villa">Villa</option> {/* ✅ FIX 2: Added Villa Option */}
          </select>
        </div>

        <div className="form-group">
          <label>Price Range (LKR)</label> {/* ✅ FIX 3: Changed label to LKR */}
          <div className="dual-input">
            <input 
              type="number" 
              placeholder="Min" 
              value={filters.minPrice}
              onChange={e => setFilters({...filters, minPrice: Number(e.target.value)})} 
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={filters.maxPrice}
              onChange={e => setFilters({...filters, maxPrice: Number(e.target.value)})} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bedrooms</label>
          <div className="dual-input">
            <input 
              type="number" 
              placeholder="Min" 
              value={filters.minBedrooms}
              onChange={e => setFilters({...filters, minBedrooms: Number(e.target.value)})} 
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={filters.maxBedrooms}
              onChange={e => setFilters({...filters, maxBedrooms: Number(e.target.value)})} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Postcode / Area</label>
          <input 
            type="text" 
            placeholder="e.g. Colombo, Galle" 
            value={filters.postcode}
            onChange={e => setFilters({...filters, postcode: e.target.value})}
            className="search-input"
          />
        </div>

        {/* REACT WIDGET REQUIREMENT */}
        <div className="form-group">
          <label>Date Added (Between)</label>
          <DatePicker 
            selected={filters.dateAfter} 
            onChange={date => setFilters({...filters, dateAfter: date})} 
            placeholderText="Start Date"
            className="search-input"
          />
          <DatePicker 
            selected={filters.dateBefore} 
            onChange={date => setFilters({...filters, dateBefore: date})} 
            placeholderText="End Date"
            className="search-input"
            style={{marginTop: '5px'}}
          />
        </div>

        <button onClick={clearFilters} className="clear-filters-btn">Reset Filters</button>

        {/* SECTION 2: FAVORITES LIST */}
        <div className="desktop-favorites">
            <FavoritesList 
              favorites={favorites} 
              removeFromFavorites={removeFromFavorites}
              clearFavorites={clearFavorites}
            />
        </div>
      </aside>

      {/* SECTION 3: RESULTS DISPLAY */}
      <main className="results-area">
        <div className="results-header">
          <h2>Properties For Sale</h2>
          <p>{filteredProperties.length} results found</p>
        </div>

        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                addToFavorites={addToFavorites} 
              />
            ))
          ) : (
            <div className="no-results">
              <p>No properties match your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
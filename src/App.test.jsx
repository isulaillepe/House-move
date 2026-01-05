import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { HashRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';

// --- MOCK DATA ---
const mockProperties = [
  {
    id: "prop1",
    type: "House",
    price: 50000000,
    bedrooms: 3,
    location: "Colombo",
    description: "Luxury House",
    images: ["/img1.jpg", "/img2.jpg"],
    floorPlan: "/fp1.jpg",
    added: { day: 1, month: "January", year: 2026 }
  },
  {
    id: "prop2",
    type: "Flat",
    price: 25000000,
    bedrooms: 1,
    location: "Kandy",
    description: "Modern Flat",
    images: ["/flat1.jpg"],
    floorPlan: "/fp2.jpg",
    added: { day: 1, month: "January", year: 2026 }
  }
];

// Helper for Search Page (Simple Router)
const renderSearchPage = (ui) => render(<HashRouter>{ui}</HashRouter>);

// Helper for Property Page (Simulates visiting a specific URL ID)
const renderPropertyPageWithId = (id) => {
  return render(
    <MemoryRouter initialEntries={[`/property/${id}`]}>
      <Routes>
        <Route path="/property/:id" element={<PropertyPage properties={mockProperties} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Estate Agent App - Critical Logic Tests', () => {
  
  // Cleanup after each test
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // ✅ TEST 1: Property Type Filtering
  it('filters properties by Type (House vs Flat)', () => {
    renderSearchPage(<SearchPage properties={mockProperties} favorites={[]} />);
    
    // FIX: Use getByRole 'combobox' because the label isn't connected by ID
    const typeSelect = screen.getByRole('combobox'); 
    fireEvent.change(typeSelect, { target: { value: 'Flat' } });

    expect(screen.getByText('Kandy')).toBeInTheDocument();
    expect(screen.queryByText('Colombo')).not.toBeInTheDocument();
  });

  // ✅ TEST 2: Price Range Filtering
  it('filters properties by Maximum Price boundary', () => {
    renderSearchPage(<SearchPage properties={mockProperties} favorites={[]} />);
    
    // FIX: Use getAllByPlaceholderText and pick the first one (Price is usually first)
    const maxInputs = screen.getAllByPlaceholderText('Max');
    const priceMaxInput = maxInputs[0]; 
    
    fireEvent.change(priceMaxInput, { target: { value: '30000000' } }); // 30 Million

    expect(screen.getByText('Kandy')).toBeInTheDocument(); // 25M is visible
    expect(screen.queryByText('Colombo')).not.toBeInTheDocument(); // 50M is hidden
  });

  // ✅ TEST 3: Favorites Logic
  it('triggers addToFavorites when the heart icon is clicked', () => {
    const addToFavSpy = vi.fn();
    renderSearchPage(
      <SearchPage 
        properties={mockProperties} 
        favorites={[]} 
        addToFavorites={addToFavSpy} 
      />
    );

    const heartButtons = screen.getAllByTitle('Add to Favorites');
    fireEvent.click(heartButtons[0]);

    expect(addToFavSpy).toHaveBeenCalledWith(mockProperties[0]);
  });

  // ✅ TEST 4: Tab Switching Logic
  it('switches content when clicking the "Floor Plan" tab', () => {
    // FIX: Use the special helper to load "prop1" so the page renders
    renderPropertyPageWithId('prop1');
    
    const floorPlanTab = screen.getByText('Floor Plan');
    fireEvent.click(floorPlanTab);

    // Now it should find the floor plan image
    expect(screen.getByAltText('Floor Plan')).toBeInTheDocument();
  });

  // ✅ TEST 5: Image Gallery Logic
  it('updates the main image when a thumbnail is clicked', () => {
    // FIX: Load "prop1" correctly
    renderPropertyPageWithId('prop1');
    
    // Find thumbnails (looking for images with "Preview" in alt text)
    const thumbnails = screen.getAllByRole('img', { name: /Preview/i });
    fireEvent.click(thumbnails[1]); // Click the second one

    const mainImg = screen.getByAltText('Main View');
    expect(mainImg.src).toContain('img2.jpg');
  });

  // ✅ TEST 6: Favorites Drop Zone Text
  it('renders the favorites drop zone instructions', () => {
    renderSearchPage(<SearchPage properties={mockProperties} favorites={[]} />);
    
    // FIX: Matched the text exactly to your HTML ("Drag properties here")
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });

});
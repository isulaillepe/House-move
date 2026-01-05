import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ background: '#2c3e50', padding: '15px 20px', color: 'white', marginBottom: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}> 🌍House-move🏡</h1>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Find a Home ❤️</Link>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
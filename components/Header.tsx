import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Oviya Rental
        </Link>
        <nav className="nav-links">
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-link signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
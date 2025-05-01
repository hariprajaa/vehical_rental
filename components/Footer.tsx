import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We provide the best vehicle rental services with a wide range of options to choose from.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/vehicles/car">Cars</a></li>
            <li><a href="/vehicles/bike">Bikes</a></li>
            <li><a href="/vehicles/bicycle">Bicycles</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@vehiclerental.com</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Vehicle Rental Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 
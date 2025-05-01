import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';

const vehicleTypes = [
  {
    type: 'car',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Cars'
  },
  {
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Bikes'
  },
  {
    type: 'bicycle',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Bicycles'
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
    <div className="hero-content">
      <h1>Oviya Rental</h1>
      <p>Your Journey, Our Priority</p>
      <a href="#our-vehicles" className="explore-button">
        Explore Vehicles
      </a>
    </div>
  </section>

  <section className="vehicles-section" id="our-vehicles">
    <div className="section-container">
      <h2 className="section-title">Our Vehicles</h2>
      <div className="vehicle-type-grid">
        {vehicleTypes.map(({ type, image, title }) => (
          <Link to={`/vehicles/${type}`} key={type} className="vehicle-type-card">
            <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
              <div className="card-overlay">
                <h2>{title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>

    </div>
  );
};

export default LandingPage; 
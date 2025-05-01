import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './styles/main.css';

type Vehicle = {
  _id: string;
  type: 'car' | 'bike' | 'bicycle';
  name: string;
  model: string;
  year: number;
  price: number;
  available: boolean;
  imageUrl: string;
};

interface VehicleListProps {
  type: 'car' | 'bike' | 'bicycle';
}

const VehicleList: React.FC<VehicleListProps> = ({ type }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log(`Fetching ${type}s...`);
        const response = await axios.get(`http://localhost:5000/api/vehicles?type=${type}`);
        setVehicles(response.data);
        setError(null);
      } catch (err) {
        const error = err as AxiosError;
        setError(`Failed to load ${type}s: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [type]);

  const handleBookClick = (vehicleId: string) => {
    navigate(`/book/${vehicleId}`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <strong>Error!</strong> {error}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="error-message warning">
        <strong>No {type}s available</strong> Please check back later.
      </div>
    );
  }

  return (
    <div className="vehicle-list">
      <div className="vehicle-list-header">
        <h2 className="vehicle-list-title">{type}s</h2>
        <div className="vehicle-count">
          Showing {vehicles.length} {type}{vehicles.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="vehicle-grid">
        {vehicles.map(vehicle => (
          <div key={vehicle._id} className="vehicle-card">
            <div className="vehicle-image-container">
              <img 
                src={vehicle.imageUrl} 
                alt={`${vehicle.name} ${vehicle.model}`} 
                className="vehicle-image"
              />
              <div className="vehicle-price-tag">
                ₹{vehicle.price}/hour
              </div>
              <div className="vehicle-overlay">
                <h3 className="vehicle-title">
                  {vehicle.name} {vehicle.model}
                </h3>
                <p className="vehicle-year">
                  Year: {vehicle.year}
                </p>
              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-status">
                <div className="availability-indicator">
                  <span className={`status-dot ${vehicle.available ? 'available' : 'unavailable'}`}></span>
                  <span className="status-text">
                    {vehicle.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
              <button 
                className={`rent-button ${!vehicle.available ? 'disabled' : ''}`}
                disabled={!vehicle.available}
                onClick={() => handleBookClick(vehicle._id)}
              >
                {vehicle.available ? 'Book Now' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VehicleListContainer: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  if (type !== 'car' && type !== 'bike' && type !== 'bicycle') {
    return <div className="error-message">Invalid vehicle type</div>;
  }
  return <VehicleList type={type} />;
};

export default VehicleListContainer;

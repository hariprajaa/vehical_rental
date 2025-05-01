import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingPage.css';

interface Vehicle {
  _id: string;
  type: string;
  name: string;
  model: string;
  year: number;
  price: number;
  available: boolean;
  imageUrl: string;
}

const BookingPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`);
        setVehicle(response.data);
      } catch (err) {
        setError('Failed to load vehicle details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const calculateTotal = () => {
    if (!startDateTime || !endDateTime || !vehicle) return 0;
    
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return hours * vehicle.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;

    setError(null);
    setBookingLoading(true);

    try {
      const totalAmount = calculateTotal();
      
      const response = await axios.post('/api/bookings', {
        vehicleId: vehicle._id,
        startDateTime,
        endDateTime,
        totalAmount
      });

      if (response.status === 201) {
        navigate('/my-bookings');
      }
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!vehicle) {
    return <div className="error-message">Vehicle not found</div>;
  }

  return (
    <div className="booking-page">
      <div className="vehicle-details-card">
        <div className="vehicle-image-container">
          <img src={vehicle.imageUrl} alt={`${vehicle.name} ${vehicle.model}`} className="vehicle-image" />
        </div>
        <div className="vehicle-info">
          <h1 className="vehicle-title">{vehicle.name} {vehicle.model}</h1>
          <div className="vehicle-meta">
            <span className="year">Year: {vehicle.year}</span>
            <span className="price">Rent per hour: ₹{vehicle.price}</span>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <h2>Select Booking Time</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="datetime-inputs">
            <div className="form-group">
              <label htmlFor="startDateTime">Start Date & Time:</label>
              <input
                type="datetime-local"
                id="startDateTime"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDateTime">End Date & Time:</label>
              <input
                type="datetime-local"
                id="endDateTime"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                min={startDateTime}
                required
              />
            </div>
          </div>

          {startDateTime && endDateTime && (
            <div className="total-section">
              <div className="total-content">
                <h3>Total Amount</h3>
                <p className="total-amount">₹{calculateTotal()}</p>
                <p className="rate-info">Rate: ₹{vehicle.price}/hour</p>
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={bookingLoading}>
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage; 
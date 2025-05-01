import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyBookings.css';

interface Vehicle {
  _id: string;
  name: string;
  model: string;
  imageUrl: string;
  type: string;
  fuelType?: string;
  capacity?: number;
  price: number;
}

interface Booking {
  _id: string;
  vehicleId: Vehicle;
  startDateTime: string;
  endDateTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/my-bookings');
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
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

  if (bookings.length === 0) {
    return (
      <div className="no-bookings">
        <h2>No Bookings Found</h2>
        <p>You haven't made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      <div className="bookings-grid">
        {bookings.map(booking => (
          <div key={booking._id} className="booking-card">
            <div className="booking-content">
              <div className="booking-image-container">
                <img 
                  src={booking.vehicleId.imageUrl} 
                  alt={`${booking.vehicleId.name} ${booking.vehicleId.model}`}
                  className="booking-image" 
                />
              </div>
              <div className="booking-info-container">
                <h2 className="vehicle-title">{booking.vehicleId.name}</h2>
                
                <div className="vehicle-details">
                  <div className="detail-item">
                    <span className="label">Model:</span>
                    <span className="value">{booking.vehicleId.model}</span>
                  </div>
                  {booking.vehicleId.fuelType && (
                    <div className="detail-item">
                      <span className="label">Fuel Type:</span>
                      <span className="value">{booking.vehicleId.fuelType}</span>
                    </div>
                  )}
                  {booking.vehicleId.capacity && (
                    <div className="detail-item">
                      <span className="label">Capacity:</span>
                      <span className="value">{booking.vehicleId.capacity} persons</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="label">Rate:</span>
                    <span className="value price">₹{booking.vehicleId.price}/hour</span>
                  </div>
                </div>

                <div className="booking-details">
                  <h3>Booking Information</h3>
                  <div className="detail-item">
                    <span className="label">Start:</span>
                    <span className="value">{formatDateTime(booking.startDateTime)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">End:</span>
                    <span className="value">{formatDateTime(booking.endDateTime)}</span>
                  </div>
                  <div className="detail-item total">
                    <span className="label">Total Amount:</span>
                    <span className="value">₹{booking.totalAmount}</span>
                  </div>
                  <div className="booking-status">
                    <span className={`status-badge ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className="booking-date">
                      Booked on {formatDateTime(booking.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingForm.css';

interface BookingFormProps {
  vehicleId: string;
  hourlyRate: number;
  onClose?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ vehicleId, hourlyRate, onClose }) => {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (!startDateTime || !endDateTime) return 0;
    
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return hours * hourlyRate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const totalAmount = calculateTotal();
      
      const response = await axios.post('/api/bookings', {
        vehicleId,
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
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Your Vehicle</h2>
      <form onSubmit={handleSubmit} className="booking-form">
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

        {startDateTime && endDateTime && (
          <div className="total-section">
            <h3>Total Amount</h3>
            <p className="total-amount">₹{calculateTotal()}</p>
            <p className="rate-info">Rate: ₹{hourlyRate}/hour</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
          {onClose && (
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 
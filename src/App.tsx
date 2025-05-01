import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from './VehicleList';
import LandingPage from './LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyBookings from './pages/MyBookings';
import BookingPage from './pages/BookingPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/vehicles/:type" element={<VehicleList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/book/:vehicleId" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

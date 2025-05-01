import mongoose from 'mongoose';
import { User } from './server.js';

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/vehicleRental', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected ✅');
}).catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});

    // Insert admin user
    await User.create({
      name: 'Admin',
      email: 'admin@rental.com',
      phone: '0000000000',
      password: '1234',
      role: 'admin'
    });

    // Insert regular user
    await User.create({
      name: 'haridha',
      email: 'haridha@gmail.com',
      phone: '9876543210',
      password: '1111',
      role: 'user'
    });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 
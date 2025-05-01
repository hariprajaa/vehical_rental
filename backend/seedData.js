import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected ✅');
}).catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

// Car Schema
const carSchema = new mongoose.Schema({
  type: { type: String, default: 'car' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Bike Schema
const bikeSchema = new mongoose.Schema({
  type: { type: String, default: 'bike' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Bicycle Schema
const bicycleSchema = new mongoose.Schema({
  type: { type: String, default: 'bicycle' },
  brand: String,
  model: String,
  year: Number,
  rentPerDay: Number,
  registrationNumber: String,
  availability: Boolean,
  image: String
});

// Create models
const Car = mongoose.model('car', carSchema);
const Bike = mongoose.model('bike', bikeSchema);
const Bicycle = mongoose.model('bicycle', bicycleSchema);

// Sample data
const cars = [
  {
    type: 'car',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    rentPerDay: 60,
    registrationNumber: 'TN01AB1234',
    availability: true,
    image: 'https://pressroom.toyota.com/wp-content/uploads/2021/06/2022_Toyota_Corolla_SE_6MT_0011.jpg'
  },
  {
    type: 'car',
    brand: 'Honda',
    model: 'City',
    year: 2021,
    rentPerDay: 55,
    registrationNumber: 'TN02CD5678',
    availability: true,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44711/honda-city-right-front-three-quarter0.jpeg'
  }
];

const bikes = [
  {
    type: 'bike',
    brand: 'Yamaha',
    model: 'FZ S FI',
    year: 2021,
    rentPerDay: 30,
    registrationNumber: 'TN03EF9012',
    availability: true,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/449039/fz-s-front-view.jpeg'
  },
  {
    type: 'bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    year: 2022,
    rentPerDay: 40,
    registrationNumber: 'TN04GH3456',
    availability: true,
    image: 'https://www.bikewale.com/images/bikes/royalenfield/classic-350/classic-350-right-front-three-quarter-2.jpeg'
  }
];

const bicycles = [
  {
    type: 'bicycle',
    brand: 'Giant',
    model: 'Escape 3',
    year: 2024,
    rentPerDay: 10,
    registrationNumber: 'TN05IJ7890',
    availability: true,
    image: 'https://www.giant-bicycles.com/_upload_us/bikes/models/2024/large/escape-3-2024.jpg'
  },
  {
    type: 'bicycle',
    brand: 'Trek',
    model: 'FX 1',
    year: 2024,
    rentPerDay: 12,
    registrationNumber: 'TN06KL1234',
    availability: true,
    image: 'https://trek.scene7.com/is/image/TrekBicycleProducts/FX1_24_35001_A_Primary?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440'
  }
];

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Car.deleteMany({});
    await Bike.deleteMany({});
    await Bicycle.deleteMany({});

    // Insert new data
    await Car.insertMany(cars);
    await Bike.insertMany(bikes);
    await Bicycle.insertMany(bicycles);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the seed function
seedData(); 
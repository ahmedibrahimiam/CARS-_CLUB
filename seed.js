require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Part = require('./models/Part');
const Brand = require('./models/Brand');
const Car = require('./models/Car');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) { console.error('Please set MONGO_URI'); process.exit(1); }

const adminEmail = 'ahmedibrahimiam@gmail.com';
const adminPassword = 'iaam20032020';
const adminName = 'Ahmed';

const partsData = [
  { name: "Fuel Pump", description: "High quality electric fuel pump suitable for multiple Toyota and Suzuki models.", price: 2300, stockQuantity: 10, imageUrl: "/images/fuel_pump.jpeg", category: "car-parts", compatibleCars: ["Toyota Paseo Coupe 1996-1999","Toyota 4Runner 1998-2002","Suzuki Baleno 1996-2002"] },
  { name: "Throttle Body", description: "Durable throttle body with high performance and precise air intake control.", price: 14500, stockQuantity: 5, imageUrl: "/images/throttle_body.jpeg", category: "car-parts", compatibleCars: ["Toyota Prado","Toyota Hilux","Lexus models"] }
];

const brandsData = [
  { name: "Audi", imageUrl: "/images/audi.jpg" },
  { name: "Hyundai", imageUrl: "/images/hyundai.jpg" },
  { name: "Mercedes", imageUrl: "/images/mercedes.jpg" },
  { name: "Toyota", imageUrl: "/images/toyota.jpg" },
  { name: "BMW", imageUrl: "/images/bmw.jpg" },
  { name: "Kia", imageUrl: "/images/kia.jpg" }
];

const carData = {
  name: "BMW M5",
  brand: "BMW",
  modelYear: 2023,
  details: "Luxury high-performance sedan with premium comfort.",
  pricePerDay: 1599,
  imageUrl: "/images/bmw_m5.jpg"
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seed');

    await User.deleteMany({});
    await Part.deleteMany({});
    await Brand.deleteMany({});
    await Car.deleteMany({});

    const admin = new User({ name: adminName, email: adminEmail, password: adminPassword, isAdmin: true });
    await admin.save();

    await Part.insertMany(partsData);
    await Brand.insertMany(brandsData);
    await Car.create(carData);

    console.log('Seed completed. Admin credentials:');
    console.log('email:', adminEmail);
    console.log('password:', adminPassword);

    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// connect DB
connectDB();

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/rent', require('./routes/rent'));
app.use('/api/brands', require('./routes/brands'));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

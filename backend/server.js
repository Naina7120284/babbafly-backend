const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('BabbaFly Backend is Running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`--- Server active on Port: ${PORT} ---`);
});
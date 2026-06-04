require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const mongoUri = process.env.MONGO_URI;

if (!mongoUri && process.env.NODE_ENV === 'production') {
  console.error('Missing MONGO_URI environment variable. Set your MongoDB Atlas URI in Render.');
  process.exit(1);
}

const connectionString = mongoUri || 'mongodb://127.0.0.1:27017/godstojie';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

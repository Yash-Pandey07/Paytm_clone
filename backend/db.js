
const mongoose = require('mongoose');

// Replace with your MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cluster0.0eudv.mongodb.net';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose;

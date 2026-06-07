const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const dotenv     = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes   = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Create Express app
const app = express();

// ===== MIDDLEWARE =====
// Allow frontend to talk to backend
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// ===== ROUTES =====
app.use('/api/auth',    authRoutes);
app.use('/api/courses', courseRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '📚 Learnify API is running!' });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ===== CONNECT TO DATABASE & START SERVER =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
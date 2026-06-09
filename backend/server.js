 const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const dotenv     = require('dotenv');

dotenv.config();

const authRoutes   = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://learnify-pld3apjrf-leranify.vercel.app',
    /\.vercel\.app$/  // Allow all vercel preview URLs
  ],
  credentials: true
}));

app.use(express.json());

// ===== ROUTES =====
app.use('/api/auth',    authRoutes);
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.json({ message: '📚 Learnify API is running!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ===== CONNECT & START =====
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
  const codeRoutes = require('./routes/codeRoutes');
app.use('/api/codes', codeRoutes);
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://learnify-pld3apjrf-leranify.vercel.app',
    'https://learnify-eta-hazel.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
const progressRoutes = require('./routes/progressRoutes');
app.use('/api/progress', progressRoutes);
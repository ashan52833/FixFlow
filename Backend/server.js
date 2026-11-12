require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const customerRoutes = require('./routes/customerRoutes');
const technicianRoutes = require('./routes/technicianRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint (verifies WampServer MySQL connection)
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      service: 'FixFlow Node.js + Express.js API',
      database: 'WampServer MySQL Connected (fixflow_db)'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'WampServer MySQL connection failed. Ensure WampServer MySQL service is green and schema.sql is imported.',
      details: err.message
    });
  }
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/technician', technicianRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('[FixFlow API Error]:', err.message);
  res.status(400).json({ error: err.message || 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`FixFlow Backend API running on http://localhost:${PORT}`);
  console.log(`Connected to WampServer MySQL database: ${process.env.DB_DATABASE || 'fixflow_db'}`);
  console.log(`================================================================`);
});
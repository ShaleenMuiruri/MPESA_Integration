const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [
      'http://localhost:5173', 
      'http://127.0.0.1:5173',
      'https://8f259c4fe07a.ngrok-free.app'
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS Origin received:', origin);
      console.log('Allowed origins:', allowedOrigins);
      
      // Temporarily allow all origins for debugging
      console.log('CORS: Origin allowed (debug mode)');
      return callback(null, true);
    },
    credentials: false, // Match client withCredentials: false
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
  })
);



// Request logging middleware
app.use((req, res, next) => {
  next();
});

// Routes
app.use('/api', routes);


// Handle 404 errors
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
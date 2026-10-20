const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize app
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`>>> [Backend App] ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));
app.use('/industries', require('./routes/industries'));
app.use('/news', require('./routes/news'));
app.use('/vacancies', require('./routes/vacancies'));
app.use('/applicants', require('./routes/applicants'));
app.use('/pages', require('./routes/pages'));
app.use('/settings', require('./routes/settings'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/tenders', require('./routes/tenders'));
// app.use('/inquiries', require('./routes/inquiries'));
// app.use('/security', require('./routes/security'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/media', require('./routes/media'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'deig-backend' });
});

// Error Handling
app.use((req, res, next) => {
  errorMiddleware.notFound(req, res, next);
});
app.use(errorMiddleware.errorHandler);

// Database connection (Mocked in our config/db.js)
if (process.env.IS_PREVIEW_MODE !== 'true') {
  connectDB();
  const PORT = process.env.BACKEND_PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Backend standalone server running on port ${PORT}`);
  });
} else {
  // In preview mode, the main server calls connectDB
  connectDB();
}

module.exports = app;

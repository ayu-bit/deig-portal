
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const industriesRoutes = require('./routes/industries');
const newsRoutes = require('./routes/news');
const vacanciesRoutes = require('./routes/vacancies');
const applicantsRoutes = require('./routes/applicants');
const mediaRoutes = require('./routes/media');
const statisticsRoutes = require('./routes/statistics');
const contactRoutes = require('./routes/contacts');
const securityRoutes = require('./routes/security');
const milestonesRoutes = require('./routes/milestones');
const tendersRoutes = require('./routes/tenders');
const suppliersRoutes = require('./routes/suppliers');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(cors());
// Configure Helmet to allow cross-origin resources (images)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for media uploads if using local storage
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.get('/api/v1', (req, res) => {
    res.json({ message: 'Welcome to the DEIG Admin API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/industries', industriesRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/vacancies', vacanciesRoutes);
app.use('/api/v1/applicants', applicantsRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/statistics', statisticsRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/security', securityRoutes);
app.use('/api/v1/milestones', milestonesRoutes);
app.use('/api/v1/tenders', tendersRoutes);
app.use('/api/v1/suppliers', suppliersRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  sequelize.sync().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`DEIG Admin Backend running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error('Database sync warning:', err.message);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`DEIG Admin Backend running on port ${PORT}`);
    });
  });
}

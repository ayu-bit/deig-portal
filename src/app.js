require('dotenv').config();
const path = require('path');
const express = require('express');
const backendApp = require('../deig-admin-backend/src/app.js');
const db = require('../deig-admin-backend/src/models/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API routes
app.use(backendApp);

// Serve frontend build if dist folder exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        name: 'DEIG Defense Industry Engineering Group API',
        status: 'online',
        port: PORT,
        message: 'Backend server is running. Build frontend with `npm run build` to view web interface.'
      });
    }
  });
});

// Database sync and server start
db.sequelize.sync().then(() => {
  console.log('Database synchronized successfully.');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DEIG Server is active and listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database sync warning (continuing start):', err.message);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DEIG Server started on port ${PORT}`);
  });
});

module.exports = app;

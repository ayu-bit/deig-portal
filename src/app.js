import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

require('dotenv').config();

const backendApp = require('../deig-admin-backend/src/app.js');
const db = require('../deig-admin-backend/src/models/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API routes
app.use(backendApp);

// Serve frontend build if dist folder exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
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
db.sequelize.sync().then(async () => {
  console.log('Database synchronized successfully.');
  try {
    const { User, Role } = db;
    let adminRole = await Role.findOne({ where: { name: 'Admin' } });
    if (!adminRole) {
      adminRole = await Role.create({ name: 'Admin', description: 'Full control over system.' });
    }
    const adminUser = await User.findOne({ where: { email: 'admin@deig.gov.et' } });
    if (!adminUser) {
      await User.create({
        name: 'Admin User',
        email: 'admin@deig.gov.et',
        password: 'AdminPassword123!',
        roleId: adminRole.id,
        status: 'Active'
      });
      console.log('Default admin seeded: admin@deig.gov.et / AdminPassword123!');
    }
  } catch (seedErr) {
    console.warn('Seed notice:', seedErr.message);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DEIG Server is active and listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database sync warning (continuing start):', err.message);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DEIG Server started on port ${PORT}`);
  });
});

export default app;

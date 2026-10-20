
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Use fallback secret 'deig_secret_key_123' if env var is missing
      const secret = process.env.JWT_SECRET || 'deig_secret_key_123';
      
      const decoded = jwt.verify(token, secret);
      
      const user = await User.findByPk(decoded.id, {
          attributes: { exclude: ['password'] },
          include: Role
      });
      
      // Normalize user object for roles middleware
      if(user) {
          req.user = user.toJSON();
          req.user.role = user.Role; // Flatten role access
          next();
      } else {
          res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

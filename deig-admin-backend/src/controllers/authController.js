
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ 
        where: { email },
        include: Role
    });

    if (user) {
        // Compare password directly here
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            user.lastLogin = new Date();
            await user.save();
            
            const payload = {
                id: user.id,
                name: user.name,
                role: user.Role ? user.Role.name : 'Viewer', // Handle case where role might be missing
                permissions: user.Role ? user.Role.permissions : [],
            };

            // Use fallback secret 'deig_secret_key_123' if env var is missing
            const secret = process.env.JWT_SECRET || 'deig_secret_key_123';
            const expiresIn = process.env.JWT_EXPIRES_IN || '30d';

            const token = jwt.sign(payload, secret, {
                expiresIn: expiresIn,
            });

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.Role ? user.Role.name : 'Viewer',
                    avatarUrl: user.avatarUrl
                }
            });
            return;
        }
    }
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { login };


const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'deig-default-secret-jwt-key-2026');
        
        const user = await User.findByPk(decoded.id, {
            include: { model: Role }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token: User not found.' });
        }
        
        req.user = user;

    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

module.exports = { verifyToken };

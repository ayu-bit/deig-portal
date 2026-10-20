
const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, roleName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Find role
        const role = await Role.findOne({ where: { name: roleName || 'Viewer' } });
        if (!role) {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            roleId: role.id
        });

        res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email },
            include: { model: Role } 
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const payload = {
            id: user.id,
            name: user.name,
            role: user.Role.name
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'deig-default-secret-jwt-key-2026',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.json({
            message: 'Logged in successfully.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.Role.name
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};

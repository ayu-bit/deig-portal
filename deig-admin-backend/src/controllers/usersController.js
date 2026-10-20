
const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });
    // Transform to flatten role name for frontend
    const formattedUsers = users.map(u => ({
        ...u.toJSON(),
        role: u.Role ? u.Role.name : 'Unknown'
    }));
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body; // Frontend sends role name or ID
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Find role by name (frontend sends string like 'Admin') or ID
    let roleRecord;
    if (typeof role === 'string' && isNaN(role)) {
         roleRecord = await Role.findOne({ where: { name: role } });
    } else {
         roleRecord = await Role.findByPk(role);
    }

    if (!roleRecord) return res.status(400).json({ message: 'Invalid role' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ 
        name, 
        email, 
        password: hashedPassword, 
        roleId: roleRecord.id,
        avatarUrl: 'https://via.placeholder.com/150' 
    });
    
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Role });
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, role, status } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.status = status || user.status;
        
        if (role) {
             let roleRecord = await Role.findOne({ where: { name: role } });
             if (roleRecord) user.roleId = roleRecord.id;
        }
        
        await user.save();
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };

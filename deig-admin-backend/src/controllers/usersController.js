
const { User, Role } = require('../models');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: { model: Role, attributes: ['name'] },
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: { model: Role, attributes: ['name'] },
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    // This is a simplified version. A real implementation would use the register flow.
    try {
        const { name, email, password, roleName } = req.body;
        const role = await Role.findOne({ where: { name: roleName }});
        if (!role) return res.status(400).json({ message: "Invalid role specified." });

        const newUser = await User.create({ name, email, password, roleId: role.id });
        const userResponse = newUser.toJSON();
        delete userResponse.password;
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, status, roleName } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const updateData = { name, email, status };
        if (roleName) {
            const role = await Role.findOne({ where: { name: roleName }});
            if (!role) return res.status(400).json({ message: "Invalid role specified." });
            updateData.roleId = role.id;
        }

        await user.update(updateData);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};


const { Role, User } = require('../models');

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        const rolesWithCounts = await Promise.all(
            roles.map(async (role) => {
                const userCount = await User.count({ where: { roleId: role.id } });
                return { ...role.toJSON(), userCount };
            })
        );
        res.status(200).json(rolesWithCounts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createRole = async (req, res) => {
    try {
        const savedRole = await Role.create(req.body);
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            await role.update(req.body);
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllRoles, createRole, updateRole };

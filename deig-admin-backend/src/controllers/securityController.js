
const { SecurityLog, User } = require('../models');
// Active sessions would be managed in memory (e.g., Redis) or a DB in a real app
const ACTIVE_SESSIONS = []; // Placeholder

const getSecurityLogs = async (req, res) => {
    try {
        const logs = await SecurityLog.findAll({
            order: [['createdAt', 'DESC']],
            include: { model: User, attributes: ['name', 'avatarUrl'] }
        });
        
        // Format for frontend
        const formatted = logs.map(l => {
            const json = l.toJSON();
            return {
                id: json.id,
                user: json.User ? json.User.name : 'Unknown',
                avatarUrl: json.User ? json.User.avatarUrl : '',
                action: json.action,
                target: json.target,
                ipAddress: json.ipAddress,
                timestamp: json.createdAt
            }
        });
        
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getActiveSessions = async (req, res) => {
    // This is a placeholder. A real implementation would query a session store.
    res.status(200).json(ACTIVE_SESSIONS);
};

const revokeSession = async (req, res) => {
    // Placeholder logic
    res.status(200).json({ message: `Session ${req.params.id} revoked.` });
};


module.exports = { getSecurityLogs, getActiveSessions, revokeSession };

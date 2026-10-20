const { AuditLog } = require('../models');

const logAction = (action) => async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : null;
        const ip = req.ip;
        const details = `${req.method} ${req.originalUrl}`;
        
        await AuditLog.create({
            userId,
            action,
            details,
            ipAddress: ip
        });

    } catch (error) {
        console.error('Audit Log Error:', error);
    }

    next();
};

module.exports = { logAction };
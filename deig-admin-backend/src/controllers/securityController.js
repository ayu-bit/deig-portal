
const { AuditLog, User, SecurityAlert, WhitelistedIp } = require('../models');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.findAll({
            limit: 100, // Limit results for performance
            order: [['createdAt', 'DESC']],
            include: { model: User, attributes: ['name'] }
        });
        
        // Format to match frontend expectation
        const formattedLogs = logs.map(log => ({
            id: log.id,
            user: log.User ? log.User.name : 'System/Unknown',
            action: log.action,
            details: log.details,
            ipAddress: log.ipAddress,
            timestamp: log.createdAt,
        }));

        res.json(formattedLogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching audit logs", error: error.message });
    }
};

exports.getSecurityAlerts = async (req, res) => {
    try {
        const alerts = await SecurityAlert.findAll({
            limit: 50,
            order: [['createdAt', 'DESC']]
        });
        
        // Format to match frontend expectation (mapping createdAt to timestamp)
        const formattedAlerts = alerts.map(alert => ({
            id: alert.id,
            type: alert.type,
            details: alert.details,
            severity: alert.severity,
            timestamp: alert.createdAt,
        }));

        res.json(formattedAlerts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching security alerts", error: error.message });
    }
};

exports.getWhitelistedIps = async (req, res) => {
    try {
        const ips = await WhitelistedIp.findAll({
            order: [['createdAt', 'DESC']]
        });
        
        const formattedIps = ips.map(ip => ({
            id: ip.id,
            ipAddress: ip.ipAddress,
            description: ip.description,
            addedBy: ip.addedBy,
            dateAdded: ip.createdAt,
        }));

        res.json(formattedIps);
    } catch (error) {
        res.status(500).json({ message: "Error fetching whitelisted IPs", error: error.message });
    }
};

exports.addWhitelistedIp = async (req, res) => {
    try {
        const { ipAddress, description } = req.body;
        const addedBy = req.user ? req.user.name : 'Admin';
        
        const newIp = await WhitelistedIp.create({
            ipAddress,
            description,
            addedBy
        });
        
        res.status(201).json(newIp);
    } catch (error) {
        res.status(500).json({ message: "Error adding whitelisted IP", error: error.message });
    }
};

exports.deleteWhitelistedIp = async (req, res) => {
    try {
        const ip = await WhitelistedIp.findByPk(req.params.id);
        if (!ip) return res.status(404).json({ message: "IP not found" });
        await ip.destroy();
        res.json({ message: "IP removed from whitelist" });
    } catch (error) {
        res.status(500).json({ message: "Error removing IP", error: error.message });
    }
};

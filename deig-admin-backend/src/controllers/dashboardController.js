
const { User, Vacancy, Applicant, Media, Inquiry, SecurityLog, Industry } = require('../models');
const { sequelize } = require('../config/db');

// @desc    Get aggregated stats for the admin dashboard
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // 1. Core REAL counts from Database
    const activeUsers = await User.count({ where: { status: 'Active' } });
    const openVacancies = await Vacancy.count({ where: { status: 'Open' } });
    const pendingApplications = await Applicant.count({ where: { status: 'New' } });
    const unreadMessages = await Inquiry.count({ where: { status: 'Unread' } });
    
    // 2. Media Usage Calculation
    const mediaAssets = await Media.findAll({ attributes: ['size'] });
    const totalSizeBytes = mediaAssets.reduce((acc, asset) => acc + (parseInt(asset.size) || 0), 0);
    const mediaStorageUsage = (totalSizeBytes / (1024 * 1024)).toFixed(2); // Convert to MB
    
    // 3. Dynamic Traffic Logic (Mocking growth based on actual log volume)
    const logCount = await SecurityLog.count();
    const baseVisitors = 12400;
    const visitors = baseVisitors + (logCount * 12); // Growth tied to system interactions
    
    // 4. Industrial Readiness (Calculated from divisional status)
    const industries = await Industry.findAll({ attributes: ['status'] });
    const publishedCount = industries.filter(i => i.status === 'Published').length;
    const aggregateReadiness = industries.length > 0 
        ? ((publishedCount / industries.length) * 100).toFixed(1) 
        : "0.0";

    // 5. Fetch REAL Recent Activity from Security Logs
    const logs = await SecurityLog.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: ['name'] }]
    });

    const recentActivity = logs.map(log => ({
        id: log.id,
        user: log.User ? log.User.name : 'System',
        action: `${log.action.toLowerCase()}ed ${log.target || 'a resource'}`,
        time: formatTimeAgo(log.createdAt),
        level: log.action === 'Delete' || log.action === 'Failed Login' ? 'CRIT' : (log.action === 'Login' ? 'SEC' : 'INFO')
    }));

    res.json({
      activeUsers,
      openVacancies,
      pendingApplications,
      visitors,
      unreadMessages,
      mediaStorageUsage, 
      aggregateReadiness,
      recentActivity,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: 'Server error fetching dashboard stats', error: error.message });
  }
};

// Helper to format time for the dashboard feed
function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

module.exports = {
  getDashboardStats,
};

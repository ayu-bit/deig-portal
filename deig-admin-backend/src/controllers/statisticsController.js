
const { User, Vacancy, Applicant, Contact, AuditLog, sequelize } = require('../models');

exports.getDashboardStats = async (req, res) => {
    try {
        const [
            openVacancies, 
            totalApplicants, 
            unreadMessages, 
            activeUsers,
            recentActivity,
            applicantsPerVacancy,
        ] = await Promise.all([
            Vacancy.count({ where: { status: 'Open' } }),
            Applicant.count(),
            Contact.count({ where: { status: 'Unread' } }),
            User.count({ where: { status: 'Active' } }),
            AuditLog.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
                include: { model: User, attributes: ['name'] }
            }),
            Vacancy.findAll({
                attributes: [
                    'title',
                    [sequelize.fn('COUNT', sequelize.col('Applicants.id')), 'applicantCount']
                ],
                include: [{
                    model: Applicant,
                    attributes: []
                }],
                group: ['Vacancy.id'],
                order: [[sequelize.literal('"applicantCount"'), 'DESC']],
                limit: 4,
                subQuery: false,
            })
        ]);

        const formattedRecentActivity = recentActivity.map(log => ({
            id: log.id,
            user: log.User ? log.User.name : 'System',
            action: log.action,
            details: log.details,
            timestamp: log.createdAt,
        }));
        
        const formattedApplicantsPerVacancy = applicantsPerVacancy.map(v => {
            // Handle localized title (JSONB)
            let title = 'Unknown Vacancy';
            if (v.title) {
                if (typeof v.title === 'string') {
                    title = v.title;
                } else if (v.title.en) {
                    title = v.title.en;
                } else {
                    // Fallback to first available key or JSON string
                    title = Object.values(v.title)[0] || JSON.stringify(v.title);
                }
            }

            return {
                title: title,
                count: parseInt(v.get('applicantCount'), 10)
            };
        });

        res.json({
            totalVisitors: 12453, // This would come from an analytics service
            activeUsers,
            openVacancies,
            totalApplicants,
            unreadMessages,
            storageUsed: 45.6, // This would come from a file storage service
            recentActivity: formattedRecentActivity,
            applicantsPerVacancy: formattedApplicantsPerVacancy,
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: "Error fetching dashboard statistics", error: error.message });
    }
};

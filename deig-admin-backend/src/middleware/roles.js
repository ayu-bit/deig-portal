
const checkRole = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required." });
    }

    const userRole = req.user.Role.name;
    if (roles.includes(userRole)) {
        return next();
    }

    return res.status(403).json({ message: "Forbidden: You do not have the required role to access this resource." });
};

const isAdmin = checkRole(['Admin']);
const isHROrAdmin = checkRole(['HR Manager', 'Admin']);
const isEditorOrAdmin = checkRole(['Editor', 'Admin']);

module.exports = {
    checkRole,
    isAdmin,
    isHROrAdmin,
    isEditorOrAdmin,
};

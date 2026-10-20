const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || !req.user.role.permissions) {
      return res.status(403).json({ message: 'Forbidden: No role or permissions found' });
    }

    const userPermissions = new Set(req.user.role.permissions);

    const hasPermission = requiredPermissions.every(p => userPermissions.has(p));

    if (hasPermission) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
    }
  };
};

module.exports = { checkPermissions };

const auditLog = (action, target) => {
  return (req, res, next) => {
    // In a real application, you would save this to a database
    console.log(
      `[AUDIT] User: ${req.user ? req.user.name : 'Unknown'} | Action: ${action} | Target: ${target} | IP: ${req.ip}`
    );
    next();
  };
};

module.exports = { auditLog };

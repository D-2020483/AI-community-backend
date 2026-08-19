export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.profile) {
      return res.status(401).json({
        success: false,
        message: "User profile not found",
      });
    }

    if (!allowedRoles.some((role) => String(role).toUpperCase() === String(req.profile.role).toUpperCase())) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
};
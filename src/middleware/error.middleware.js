export const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
  }

  const authMessages = [
    "Invalid login credentials",
    "Invalid or expired access token",
    "Profile not found for this account",
    "An account with this email already exists",
  ];

  if (authMessages.some((msg) => error.message?.includes(msg))) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message?.includes("permission") || error.message?.includes("deactivated")) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message?.includes("already been used")) {
    return res.status(410).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message?.includes("not found")) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message?.includes("already exists")) {
    return res.status(409).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
import { supabase } from "../config/supabase.js";
import prisma from "../config/database.js";

const profileInclude = {
  authority: true,
  officer: { include: { authority: true } },
};

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: data.user.id },
      include: profileInclude,
    });

    if (!profile) {
      return res.status(401).json({
        success: false,
        message: "Profile not found for this account",
      });
    }

    req.user = data.user;
    req.profile = profile;
    req.accessToken = token;

    next();
  } catch (error) {
    next(error);
  }
};
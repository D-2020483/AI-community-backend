import {
  registerCitizen,
  loginUser,
  refreshAuthSession,
  getInviteByToken,
  getLoginInvite,
  acceptInvite,
  changePassword,
  updateCurrentUser,
} from "./auth.service.js";

import {
  registerSchema,
  loginSchema,
  refreshSchema,
  acceptInviteSchema,
  changePasswordSchema,
  updateMeSchema,
} from "./auth.validation.js";

export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerCitizen(validatedData);

    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please verify your email if required.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = refreshSchema.parse(req.body);
    const result = await refreshAuthSession(refresh_token);

    res.status(200).json({
      success: true,
      message: "Session refreshed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getInvite = async (req, res, next) => {
  try {
    const invite = await getInviteByToken(req.params.token);

    res.status(200).json({
      success: true,
      data: { invite },
    });
  } catch (error) {
    next(error);
  }
};

export const getLoginInviteStatus = async (req, res, next) => {
  try {
    const invite = await getLoginInvite(req.params.token);
    res.status(200).json({
      success: true,
      data: { invite },
    });
  } catch (error) {
    next(error);
  }
};

export const postAcceptInvite = async (req, res, next) => {
  try {
    const validatedData = acceptInviteSchema.parse(req.body);
    const result = await acceptInvite(validatedData);

    res.status(200).json({
      success: true,
      message: "Invitation accepted. You can now sign in.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const postChangePassword = async (req, res, next) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);
    await changePassword(req.profile.id, validatedData);

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const patchMe = async (req, res, next) => {
  try {
    const validatedData = updateMeSchema.parse(req.body);
    const user = await updateCurrentUser(req.profile.id, validatedData);

    res.status(200).json({
      success: true,
      message: "Settings saved successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

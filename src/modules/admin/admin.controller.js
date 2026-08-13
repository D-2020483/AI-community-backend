import {
  createAuthority,
  createOfficer,
  listAuthorities,
  listOfficers,
  resetOfficerPassword,
} from "./admin.service.js";
import {
  createAuthoritySchema,
  createOfficerSchema,
} from "./admin.validation.js";

export const postAuthority = async (req, res, next) => {
  try {
    const data = createAuthoritySchema.parse(req.body);
    const result = await createAuthority(req.profile.id, data);

    res.status(201).json({
      success: true,
      message: "Authority created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const postOfficer = async (req, res, next) => {
  try {
    const data = createOfficerSchema.parse(req.body);
    const result = await createOfficer(req.profile.id, data);

    res.status(201).json({
      success: true,
      message: "Officer created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorities = async (req, res, next) => {
  try {
    const authorities = await listAuthorities();
    res.status(200).json({ success: true, data: { authorities } });
  } catch (error) {
    next(error);
  }
};

export const getOfficers = async (req, res, next) => {
  try {
    const officers = await listOfficers();
    res.status(200).json({ success: true, data: { officers } });
  } catch (error) {
    next(error);
  }
};

export const postResetOfficerPassword = async (req, res, next) => {
  try {
    const { officerId } = req.params;
    const result = await resetOfficerPassword(officerId);

    res.status(200).json({
      success: true,
      message: "Temporary password reset successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

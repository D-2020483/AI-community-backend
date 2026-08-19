import {
  createAuthority,
  createOfficer,
  listAuthorities,
  listOfficers,
  resetOfficerPassword,
  listCitizens,
  getCitizen,
  updateCitizen,
  toggleCitizenStatus,
  deleteCitizen,
  getAuthority,
  updateAuthority,
  toggleAuthorityStatus,
  deleteAuthority,
  getOfficer,
  updateOfficer,
  toggleOfficerStatus,
  deleteOfficer,
  listCategories,
  listActiveCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
  listReports,
  getReport,
  updateReport,
  deleteReport,
  getAdminInsights,
  listAdminNotifications,
} from "./admin.service.js";
import {
  createAuthoritySchema,
  createOfficerSchema,
  updateCitizenSchema,
  updateAuthoritySchema,
  updateOfficerSchema,
  createCategorySchema,
  updateCategorySchema,
  updateReportSchema,
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
    const result = await resetOfficerPassword(req.params.officerId);
    res.status(200).json({
      success: true,
      message: "Temporary password reset successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCitizens = async (req, res, next) => {
  try {
    const users = await listCitizens();
    res.status(200).json({ success: true, data: { users } });
  } catch (error) {
    next(error);
  }
};

export const getCitizenById = async (req, res, next) => {
  try {
    const user = await getCitizen(req.params.userId);
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const patchCitizen = async (req, res, next) => {
  try {
    const data = updateCitizenSchema.parse(req.body);
    const user = await updateCitizen(req.params.userId, data);
    res.status(200).json({
      success: true,
      message: "Citizen updated successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const patchCitizenStatus = async (req, res, next) => {
  try {
    const user = await toggleCitizenStatus(req.params.userId);
    res.status(200).json({
      success: true,
      message:
        user.status === "Active"
          ? "Citizen enabled successfully"
          : "Citizen deactivated successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const removeCitizen = async (req, res, next) => {
  try {
    const result = await deleteCitizen(req.params.userId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const getAuthorityById = async (req, res, next) => {
  try {
    const authority = await getAuthority(req.params.authorityId);
    res.status(200).json({ success: true, data: { authority } });
  } catch (error) {
    next(error);
  }
};

export const patchAuthority = async (req, res, next) => {
  try {
    const data = updateAuthoritySchema.parse(req.body);
    const authority = await updateAuthority(req.params.authorityId, data);
    res.status(200).json({
      success: true,
      message: "Authority updated successfully",
      data: { authority },
    });
  } catch (error) {
    next(error);
  }
};

export const patchAuthorityStatus = async (req, res, next) => {
  try {
    const authority = await toggleAuthorityStatus(req.params.authorityId);
    res.status(200).json({
      success: true,
      message:
        authority.status === "Active"
          ? "Authority enabled successfully"
          : "Authority deactivated successfully",
      data: { authority },
    });
  } catch (error) {
    next(error);
  }
};

export const removeAuthority = async (req, res, next) => {
  try {
    const result = await deleteAuthority(req.params.authorityId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const getOfficerById = async (req, res, next) => {
  try {
    const officer = await getOfficer(req.params.officerId);
    res.status(200).json({ success: true, data: { officer } });
  } catch (error) {
    next(error);
  }
};

export const patchOfficer = async (req, res, next) => {
  try {
    const data = updateOfficerSchema.parse(req.body);
    const officer = await updateOfficer(req.params.officerId, data);
    res.status(200).json({
      success: true,
      message: "Officer updated successfully",
      data: { officer },
    });
  } catch (error) {
    next(error);
  }
};

export const patchOfficerStatus = async (req, res, next) => {
  try {
    const officer = await toggleOfficerStatus(req.params.officerId);
    res.status(200).json({
      success: true,
      message:
        officer.status === "Active"
          ? "Officer enabled successfully"
          : "Officer deactivated successfully",
      data: { officer },
    });
  } catch (error) {
    next(error);
  }
};

export const removeOfficer = async (req, res, next) => {
  try {
    const result = await deleteOfficer(req.params.officerId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await listCategories();
    res.status(200).json({ success: true, data: { categories } });
  } catch (error) {
    next(error);
  }
};

export const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await listActiveCategories();
    res.status(200).json({ success: true, data: { categories } });
  } catch (error) {
    next(error);
  }
};

export const postCategory = async (req, res, next) => {
  try {
    const data = createCategorySchema.parse(req.body);
    const category = await createCategory(data);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

export const patchCategory = async (req, res, next) => {
  try {
    const data = updateCategorySchema.parse(req.body);
    const category = await updateCategory(req.params.categoryId, data);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

export const patchCategoryStatus = async (req, res, next) => {
  try {
    const category = await toggleCategoryStatus(req.params.categoryId);
    res.status(200).json({
      success: true,
      message:
        category.status === "Active"
          ? "Category enabled successfully"
          : "Category disabled successfully",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

export const removeCategory = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.params.categoryId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const reports = await listReports();
    res.status(200).json({ success: true, data: { reports } });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const report = await getReport(req.params.reportId);
    res.status(200).json({ success: true, data: { report } });
  } catch (error) {
    next(error);
  }
};

export const patchReport = async (req, res, next) => {
  try {
    const data = updateReportSchema.parse(req.body);
    const report = await updateReport(req.params.reportId, data);
    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      data: { report },
    });
  } catch (error) {
    next(error);
  }
};

export const removeReport = async (req, res, next) => {
  try {
    const result = await deleteReport(req.params.reportId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const getInsights = async (req, res, next) => {
  try {
    const insights = await getAdminInsights(req.query.period || "This Year");
    res.status(200).json({ success: true, data: insights });
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await listAdminNotifications();
    res.status(200).json({ success: true, data: { notifications } });
  } catch (error) {
    next(error);
  }
};

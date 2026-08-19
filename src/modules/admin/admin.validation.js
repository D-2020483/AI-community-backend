import { z } from "zod";

export const createAuthoritySchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  address: z.string().max(300).optional().or(z.literal("")),
  coverage: z.string().max(200).optional().or(z.literal("")),
  district: z.string().max(150).optional().or(z.literal("")),
  description: z.string().max(1000).optional().or(z.literal("")),
});

export const createOfficerSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  position: z.string().max(120).optional().or(z.literal("")),
  department: z.string().max(120).optional().or(z.literal("")),
  authorityId: z.string().uuid(),
});

export const resetOfficerPasswordSchema = z.object({
  officerId: z.string().uuid(),
});

export const updateCitizenSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z
    .union([z.literal(""), z.string().trim().min(7).max(20)])
    .optional(),
  district: z.string().max(150).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
});


export const updateAuthoritySchema = z.object({
  name: z.string().min(2).max(150).optional(),
  email: z.string().email().optional(),
  phone: z.union([z.literal(""), z.string().trim().min(7).max(20)]).optional(),
  address: z.string().max(300).optional().or(z.literal("")),
  coverage: z.string().max(200).optional().or(z.literal("")),
  district: z.string().max(150).optional().or(z.literal("")),
  description: z.string().max(1000).optional().or(z.literal("")),
});

export const updateOfficerSchema = z.object({
  firstName: z.string().min(1).max(80).optional(),
  lastName: z.string().min(1).max(80).optional(),
  email: z.string().email().optional(),
  phone: z.union([z.literal(""), z.string().trim().min(7).max(20)]).optional(),
  position: z.string().max(120).optional().or(z.literal("")),
  department: z.string().max(120).optional().or(z.literal("")),
  authorityId: z.string().uuid().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(2).max(120),
  icon: z.string().max(40).optional().or(z.literal("")),
  color: z.string().max(20).optional().or(z.literal("")),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(120).optional(),
  icon: z.string().max(40).optional().or(z.literal("")),
  color: z.string().max(20).optional().or(z.literal("")),
});

export const updateReportSchema = z.object({
  status: z.string().max(40).optional(),
  priority: z.string().max(40).optional(),
  assignedAuthority: z.string().max(200).optional().or(z.literal("")),
  category: z.string().max(120).optional().or(z.literal("")),
});

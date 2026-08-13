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

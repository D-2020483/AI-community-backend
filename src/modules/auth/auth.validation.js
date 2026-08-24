import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must contain at least 2 characters")
      .max(100),

    email: z.string().email("Please provide a valid email address"),

    phone: z
      .string()
      .min(7, "Phone number is invalid")
      .max(20)
      .optional()
      .or(z.literal("")),

    password: z.string().min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const refreshSchema = z.object({
  refresh_token: z.string().min(1, "Refresh token is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
  expectedRole: z.enum(["citizen", "authority", "officer", "admin"]).optional(),
  inviteToken: z.string().optional(),
});

export const acceptInviteSchema = z
  .object({
    token: z.string().min(1, "Invitation token is required"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateMeSchema = z.object({
  fullName: z.string().min(2, "Full name must contain at least 2 characters").max(100),
  phone: z
    .string()
    .min(7, "Phone number is invalid")
    .max(20)
    .optional()
    .or(z.literal("")),
  district: z.string().max(150).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
});

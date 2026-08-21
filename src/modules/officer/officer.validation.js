import { z } from "zod";

export const updateOfficerTaskSchema = z
  .object({
    status: z.string().max(40).optional(),
    note: z.string().max(2000).optional().or(z.literal("")),
  })
  .refine((data) => Boolean(data.status || (data.note && data.note.trim())), {
    message: "Provide a status change or an update note.",
  });

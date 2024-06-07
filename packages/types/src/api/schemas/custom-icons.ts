import { z } from "zod";

export const uploadIconSchema = z.object({});

export const apiDeleteCustomIconSchema = z.object({
  iconId: z.string(),
});

export const apiRenameCustomIconSchema = z.object({
  name: z.string(),
});

export type IconUploadInput = z.infer<typeof uploadIconSchema>;
export type ApiDeleteCustomIconInput = z.infer<
  typeof apiDeleteCustomIconSchema
>;
export type ApiRenameCustomIconInput = z.infer<
  typeof apiRenameCustomIconSchema
>;

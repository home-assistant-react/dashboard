import { z } from "zod";

export const uploadImageSchema = z.object({});

export const apiDeleteCustomImageSchema = z.object({
  imageId: z.string(),
});

export const apiRenameCustomImageSchema = z.object({
  name: z.string(),
});

export type ImageUploadInput = z.infer<typeof uploadImageSchema>;
export type ApiDeleteCustomImageInput = z.infer<
  typeof apiDeleteCustomImageSchema
>;
export type ApiRenameCustomImageInput = z.infer<
  typeof apiRenameCustomImageSchema
>;

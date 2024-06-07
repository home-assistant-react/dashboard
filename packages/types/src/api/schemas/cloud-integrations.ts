import { z } from "zod";
import {
  AlbumPhoto,
  CloudIntegration,
  GetAlbumsResponse,
  GetPhotosInAlbumResponse,
  StartedAuth,
} from "../cloud-integration";

export const authStartSchema = z.object({
  auth_key: z.string().optional(),
  client_id: z.string(),
  client_secret: z.string(),
  redirect_uri: z.string().optional(),
});

export const getRandomPhotosSchema = z.object({
  albums: z.array(
    z.object({
      integration: z.string(),
      auth_key: z.string(),
      album_id: z.string(),
    }),
  ),
  maxItems: z.number().optional(),
});

export const getIntegrationsSchema = z.object({
  allowedTypes: z.array(z.string()).optional(),
});

export const authCancelSchema = z.object({
  auth_key: z.string(),
});

export const getPhotosInAlbumSchema = z.object({
  auth_key: z.string(),
  album_id: z.string(),
  page_size: z.number().optional(),
  next_page_token: z.string().optional(),
});

export type GetIntegrationsInput = z.infer<typeof getIntegrationsSchema>;
export type GetRandomPhotosInput = z.infer<typeof getRandomPhotosSchema>;
export type AuthStartInput = z.infer<typeof authStartSchema>;
export type AuthCancelInput = z.infer<typeof authCancelSchema>;
export type GetPhotosInAlbumInput = z.infer<typeof getPhotosInAlbumSchema>;

export interface GetRandomPhotosOutput {
  photos: AlbumPhoto[];
  totalPhotos: number;
}

export interface CloudIntegrationAuthStartOutput {
  started: boolean;
  authData: StartedAuth;
  login_uri: string;
}

export interface GetIntegrationsOutput {
  integrations: CloudIntegration[];
}

export interface CloudIntegrationAuthCancelOutput {
  canceled: boolean;
}

export type CloudIntegrationGetPhotosInAlbumOutput = GetPhotosInAlbumResponse;
export type CloudIntegrationGetAlbumsOutput = GetAlbumsResponse;

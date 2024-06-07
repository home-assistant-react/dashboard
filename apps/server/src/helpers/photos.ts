import {
  AlbumPhoto,
  CloudIntegrationData,
} from "@home-assistant-react/types/src/api";
import md5 from "md5";
import path from "path";
import { CACHE_PATH, CLOUD_INTEGRATIONS_PATH } from "../const";
import {
  errIntegrationGetPhotosFailed,
  errIntegrationMissingAlbumId,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "./buildApiError";
import { getJsonCache, saveJsonCache } from "./cache";
import { IntegrationHandler } from "./integration-handler";

export interface GetAllPhotosInAlbumOptions {
  integration: IntegrationHandler;
  auth: CloudIntegrationData;
  albumId: string;
  maxItems?: number;
  cacheTime?: number;
}

export const getIntegrationCachePath = (authData: CloudIntegrationData) => {
  if (!authData.authData?.authId) return CACHE_PATH;
  return path.join(CLOUD_INTEGRATIONS_PATH, authData.authData.authId, "cache");
};

export const getAllPhotosInAlbum = async (
  options: GetAllPhotosInAlbumOptions,
) => {
  const cacheMinutes = options.cacheTime || 60 * 24 * 2;

  if (!options.albumId) {
    throw buildApiError(
      "8898ef20-28df-41a4-913e-052f6a38dd6e",
      errIntegrationMissingAlbumId,
    );
  }

  const cacheKey = `album_photos_${options.integration.integrationName}_${options.auth.authData?.authId || "integration"}_${md5(options.albumId)}`;
  let photos = getJsonCache<AlbumPhoto[]>(
    cacheKey,
    getIntegrationCachePath(options.auth),
  );
  if (!photos) {
    try {
      const photosInAlbum = await options.integration.getAllPhotosInAlbum(
        options.albumId,
        options.auth,
      );
      photos = (photosInAlbum?.photos || []).map((photo) => ({
        ...photo,
      }));

      saveJsonCache(
        cacheKey,
        photos,
        getIntegrationCachePath(options.auth),
        cacheMinutes,
      );
    } catch (error) {
      throw buildApiError(
        "30b207fe-fcdc-47ea-bbc6-f6a7a6c940a9",
        errIntegrationGetPhotosFailed,
        { errors: error },
      );
    }
  }

  if (!options.maxItems) return photos;

  return photos.slice(0, options.maxItems);
};

import {
  AlbumPhoto,
  CloudIntegrationData,
  GetAlbumsResponse,
  GetAllPhotosInAlbumResponse,
  GetPhotoOptions,
  GetPhotosInAlbumOptions,
  GetPhotosInAlbumResponse,
  RedirectResponse,
  StartedAuth,
} from "@home-assistant-react/types/src/api";
import axios from "axios";
import {
  GOOGLE_API_BASE_URL,
  GOOGLE_API_ENDPOINT_TOKEN,
  GOOGLE_API_PHOTO_BASE_URL,
  OAUTH_GOOGLE_SCOPES,
} from "../const";
import {
  errGoogleIntegrationInvalidClientId,
  errGoogleIntegrationInvalidClientSecret,
  errGoogleIntegrationInvalidRefreshToken,
  errGoogleIntegrationNoPhotoUrl,
  errGoogleNoAuthTokenReceived,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { IntegrationHandler } from "../helpers/integration-handler";
import querystring from "querystring";
import { Request } from "express";

export interface GooglePhotoAlbumResponse {
  mediaItems: GooglePhotoPhotoItem[];
  nextPageToken?: string;
}

export interface GooglePhotoPhotoItem {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata?: {
    creationTime?: string;
    width?: string;
    height?: string;
    photo?: {
      cameraMake: string;
      cameraModel: string;
      focalLength: number;
      apertureFNumber: number;
      isoEquivalent: number;
      exposureTime: string;
    };
  };
  filename: string;
}

export const getGoogleApiUrl = (endpoint: string) => {
  return GOOGLE_API_BASE_URL + endpoint;
};

export const getGooglePhotoApiUrl = (endpoint: string) => {
  return GOOGLE_API_PHOTO_BASE_URL + endpoint;
};

export class Google extends IntegrationHandler {
  constructor() {
    super("google", "");
  }

  public async getAuthToken(auth: CloudIntegrationData) {
    const refreshToken = auth.integrationData?.refresh_token || "";
    const clientId = auth.authData?.authData.clientId;
    const clientSecret = auth.authData?.authData.clientSecret;

    if (!refreshToken) {
      throw buildApiError(
        "e31531de-c0f0-48a3-9a76-e109face8467",
        errGoogleIntegrationInvalidRefreshToken,
      );
    }

    if (!clientId) {
      throw buildApiError(
        "5d5eabbd-cf7f-4b80-84f8-63d593037a68",
        errGoogleIntegrationInvalidClientId,
      );
    }

    if (!clientSecret) {
      throw buildApiError(
        "f58784bb-1df5-4757-afc0-8ff818dcbc77",
        errGoogleIntegrationInvalidClientSecret,
      );
    }

    const refreshUrl = "https://oauth2.googleapis.com/token";
    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const response = await axios.post(refreshUrl, payload);
    const newAccessToken = response.data?.access_token;

    if (!newAccessToken) {
      throw buildApiError(
        "34fcc078-feba-4aaf-a6a3-3c596026335a",
        errGoogleNoAuthTokenReceived,
      );
    }

    return newAccessToken;
  }

  public async getRequestHeaders(auth: CloudIntegrationData, isJson = true) {
    const accessToken = await this.getAuthToken(auth);

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (isJson) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  public override async getIntegrationAuthUrl(startedAuth: StartedAuth) {
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      client_id: startedAuth["authData"]["clientId"],
      redirect_uri: startedAuth["authData"]["redirectUri"],
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: OAUTH_GOOGLE_SCOPES.join(" "),
      state: Buffer.from(
        JSON.stringify({
          a: startedAuth.authId,
          s: startedAuth.secretKey,
        }),
      ).toString("base64"),
    };

    return `${url}?${querystring.stringify(params)}`;
  }

  public override getRedirectQueryData(request: Request) {
    const { code, state } = request.query;
    const { a, s } = JSON.parse(
      Buffer.from(state as string, "base64").toString(),
    );

    return {
      authId: a,
      secretKey: s,
      cloudCode: code as string,
    };
  }

  public override async completeAuth(
    startedAuth: StartedAuth,
    data: RedirectResponse,
  ): Promise<CloudIntegrationData> {
    const requestData = {
      code: data.cloudCode,
      client_id: startedAuth.authData.clientId,
      client_secret: startedAuth.authData.clientSecret,
      redirect_uri: startedAuth.authData.redirectUri,
      grant_type: "authorization_code",
    };

    const googleResponse = await axios({
      url: getGoogleApiUrl(GOOGLE_API_ENDPOINT_TOKEN),
      method: "post",
      data: requestData,
    });

    const accessToken = googleResponse.data.access_token;

    if (!accessToken) {
      throw buildApiError(
        "868b3f21-9555-4bf1-80fb-e871a63a6938",
        errGoogleNoAuthTokenReceived,
      );
    }

    const userInfo = await axios({
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      userData: userInfo.data,
      integrationData: googleResponse.data,
      authData: startedAuth,
    };
  }

  public override async getAlbums(
    auth: CloudIntegrationData,
  ): Promise<GetAlbumsResponse> {
    const headers = await this.getRequestHeaders(auth);

    const resultAlbums = await axios({
      url: getGooglePhotoApiUrl("/albums?pageSize=50"),
      method: "get",
      headers,
    });

    return (resultAlbums?.data?.albums || []).map((album: any) => ({
      id: album.id,
      title: album.title,
      itemsCount: album.mediaItemsCount,
      coverPhotoId: album.coverPhotoMediaItemId,
    }));
  }

  public override async getPhoto(options: GetPhotoOptions) {
    const headers = await this.getRequestHeaders(options.auth);

    const resultPhoto = await axios({
      url: getGooglePhotoApiUrl(`/mediaItems/${options.photoId}`),
      method: "get",
      headers: {
        ...headers,
        "Cache-Control": "public, max-age=31536000",
      },
    });

    const photo = resultPhoto?.data;

    if (!photo?.baseUrl) {
      throw buildApiError(
        "f75e62ea-7fc6-498a-b458-c4d50e0df6d8",
        errGoogleIntegrationNoPhotoUrl,
      );
    }

    const photoUrl =
      options?.width && options.height
        ? `${photo.baseUrl}=w${options.width}-h${options.height}`
        : `${photo.baseUrl}=d`;

    const mediaResult = await axios({
      url: photoUrl,
      method: "get",
      headers: {
        ...headers,
        "Cache-Control": "public, max-age=31536000",
      },
      responseType: "arraybuffer",
    });

    return mediaResult.data;
  }

  public override async getPhotosInAlbum(
    albumId: string,
    options: GetPhotosInAlbumOptions,
  ): Promise<GetPhotosInAlbumResponse> {
    const pageSize = options.pageSize || 50;
    const headers = await this.getRequestHeaders(options.auth);

    const resultPhotos = await axios<GooglePhotoAlbumResponse>({
      url: getGooglePhotoApiUrl(`/mediaItems:search`),
      data: {
        albumId,
        pageSize,
        pageToken: options.nextPageToken,
      },
      method: "post",
      headers,
    });

    return {
      photos: (resultPhotos?.data?.mediaItems || []).map((photo) => ({
        id: photo.id,
        url: photo.baseUrl,
        mimeType: photo.mimeType,
        created: photo.mediaMetadata?.creationTime || "",
        width: parseInt(photo.mediaMetadata?.width || "0"),
        height: parseInt(photo.mediaMetadata?.height || "0"),
        metaData: photo.mediaMetadata?.photo,
        integration: this.integrationName,
        auth_key: options.auth.authData?.authId || "",
        filename: photo.filename,
      })),
      nextPageToken: resultPhotos?.data?.nextPageToken,
    };
  }

  public override async getAllPhotosInAlbum(
    albumId: string,
    auth: CloudIntegrationData,
  ): Promise<GetAllPhotosInAlbumResponse> {
    const photos: AlbumPhoto[] = [];
    const pageSize = 100;

    let nextPageToken: string | undefined = "";
    do {
      const result = await this.getPhotosInAlbum(albumId, {
        pageSize,
        nextPageToken,
        auth,
      });

      photos.push(...result.photos);
      nextPageToken = result.nextPageToken;
    } while (nextPageToken);

    return { photos };
  }
}

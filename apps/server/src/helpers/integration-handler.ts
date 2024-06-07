import {
  CloudIntegrationData,
  GetAlbumsResponse,
  GetAllPhotosInAlbumResponse,
  GetPhotosInAlbumOptions,
  GetPhotosInAlbumResponse,
  RedirectResponse,
  StartedAuth,
} from "@home-assistant-react/types/src/api";
import { Request } from "express";
import querystring from "querystring";

export class IntegrationHandler {
  public integrationName: string;
  public serviceUrl: string;

  constructor(integrationName: string, serviceUrl: string) {
    this.integrationName = integrationName;
    this.serviceUrl = serviceUrl;
  }

  public async getRedirectUrl() {
    return `/integrations/${this.integrationName}/auth/redirect`;
  }

  public async getLoginUrl(authData: StartedAuth) {
    return `/integrations/google/auth/login?${querystring.stringify({
      k: authData?.authId,
      s: authData?.secretKey,
      t: new Date().toISOString(),
    })}`;
  }

  // @ts-ignore
  public async getAlbums(
    auth: CloudIntegrationData,
  ): Promise<GetAlbumsResponse>;

  // @ts-ignore
  public async getPhotosInAlbum(
    albumId: string,
    options: GetPhotosInAlbumOptions,
  ): Promise<GetPhotosInAlbumResponse>;

  // @ts-ignore
  public async getAllPhotosInAlbum(
    albumId: string,
    auth: CloudIntegrationData,
  ): Promise<GetAllPhotosInAlbumResponse>;

  // @ts-ignore
  public async getPhoto(options: GetPhotoOptions);

  // @ts-ignore
  public async getIntegrationAuthUrl(startedAuth: StartedAuth);

  // @ts-ignore
  public async completeAuth(
    startedAuth: StartedAuth,
    data: RedirectResponse,
  ): Promise<CloudIntegrationData>;

  // @ts-ignore
  public async getRedirectQueryData(request: Request): RedirectResponse {}
}

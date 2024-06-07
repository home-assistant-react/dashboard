export interface AuthDataData {
  [key: string]: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}
export interface StartedAuth {
  started: boolean;
  authId: string;
  secretKey: string;
  startedTime: Date;
  origin: string;
  type: string;
  authData: AuthDataData;
}

export interface CloudIntegrationData {
  userData?: Record<string, string>;
  integrationData?: Record<string, string>;
  authData?: StartedAuth;
}

export interface GetPhotosInAlbumOptions {
  pageSize?: number;
  nextPageToken?: string;
  auth: CloudIntegrationData;
}

export interface GetPhotoOptions {
  photoId: string;
  width?: number;
  height?: number;
  auth: CloudIntegrationData;
}

export interface RedirectResponse {
  cloudCode: string;
  secretKey: string;
  authId: string;
}

export interface AlbumPhotoMetaData {
  cameraMake?: string;
  cameraModel?: string;
  focalLength?: number;
  apertureFNumber?: number;
  isoEquivalent?: number;
  exposureTime?: string;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  mimeType: string;
  created: string;
  width: number;
  height: number;
  metaData?: AlbumPhotoMetaData;
  filename: string;
  integration: string;
  auth_key: string;
}

export interface GetPhotosInAlbumResponse {
  photos: AlbumPhoto[];
  nextPageToken?: string;
}

export interface GetAllPhotosInAlbumResponse {
  photos: AlbumPhoto[];
}

export interface CloudIntegration {
  integration: string;
  auth_key: string;
  userInfo: Record<string, string>;
  created_at: string;
}

export interface CloudIntegrationAlbum {
  id: string;
  title: string;
  itemsCount: number;
  coverPhotoId: string;
}

export interface GetAlbumsResponse {
  albums: CloudIntegrationAlbum[];
}

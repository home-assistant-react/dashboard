export type CameraStreamType = "hls" | "web_rtc";

export enum CameraSupportedFeatures {
  ON_OFF = 1,
  STREAM = 2,
}

export interface HassCameraEntityAttributes {
  access_token?: string;
  entity_picture?: string;
  friendly_name?: boolean;
  frontend_stream_type?: CameraStreamType;
  supported_features?: CameraSupportedFeatures;
}

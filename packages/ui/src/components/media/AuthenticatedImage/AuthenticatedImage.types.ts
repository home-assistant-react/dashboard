import React from "react";
import { BoxProps } from "../../../primitives/common";

export interface AuthenticatedImageProps extends BoxProps {
  src?: string;
  photoId?: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  integrationName?: string;
  authKey?: string;
  w?: number;
  h?: number;
  allowCache?: boolean;
  imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">;
  backdropBackground?: boolean;
  placeholder?: string;
}

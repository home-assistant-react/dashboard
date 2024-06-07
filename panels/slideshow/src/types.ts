import { AlbumValue } from "@home-assistant-react/types/src/api";

export interface SlideshowOptions {
  albums?: AlbumValue[];
  autoplayEnabled?: boolean;
  autoplayDelay?: number;
  refreshMinutes?: number;
  itemsPerSlide?: number;
  itemsPerGroup?: number;
  maxItems?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

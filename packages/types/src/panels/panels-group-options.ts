import { IconValue } from "../icons";

export interface DashboardPanelsGroupAutoplayOptions {
  delay?: number;
  stopOnLastSlide?: boolean;
  disableOnInteraction?: boolean;
  reverseDirection?: boolean;
  waitForTransition?: boolean;
  pauseOnMouseEnter?: boolean;
}

export interface PanelsGroupOptions {
  groupType?: "swiper" | "grid";
  gridColumns?: number;
  gridTitle?: string;
  gridTitleIcon?: IconValue;
  slidesPerView?: number;
  autoPlay?: "Yes" | "No";
  autoPlayDelay?: number;
  effect?:
    | "slide"
    | "slide-in-out-zoom"
    | "slide-in-out"
    | "slide-in"
    | "slide-3d"
    | "cards"
    | "flip";
  showPagination?: boolean;
  loop?: boolean;
}

export const defaultGroupOptions: Partial<PanelsGroupOptions> = {
  groupType: "swiper",
  slidesPerView: 1,
  autoPlay: "No",
  autoPlayDelay: 5000,
  effect: "slide",
  showPagination: true,
  loop: true,
  gridColumns: 2,
};

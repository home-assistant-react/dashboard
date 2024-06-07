import { defaultGroupOptions } from "@home-assistant-react/types/src";
import React from "react";
import { PanelsGroupProps } from "./PanelsGroup.types";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFlip,
  EffectCards,
  EffectCreative,
} from "swiper/modules";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { getPanelFromDashboardState } from "@home-assistant-react/helpers/src/panels/getPanelFromDashboardState";
import { Panel } from "../Panel";
import { useDashboard } from "@home-assistant-react/api/src";

export const PanelsGroupSwiper = React.forwardRef<
  HTMLDivElement,
  PanelsGroupProps
>((props) => {
  const { group } = props;
  const isAutoPlay = group.groupOptions?.autoPlay === "Yes";
  const customProps: SwiperProps = {};
  const showPagination =
    group.groupOptions?.showPagination ?? defaultGroupOptions.showPagination;
  const customCss: React.CSSProperties = {};
  const panels = group.panels || [];
  const loopEnabled = group.groupOptions?.loop ?? defaultGroupOptions.loop;
  const dashboard = useDashboard();

  // TODO - use Memo to improve performance
  const swiperModules = [Navigation];
  if (isAutoPlay) {
    swiperModules.push(Autoplay);
    customProps.autoplay = {
      delay:
        group.groupOptions?.autoPlayDelay || defaultGroupOptions.autoPlayDelay,
      stopOnLastSlide: false,
      disableOnInteraction: false,
      reverseDirection: false,
      waitForTransition: false,
      pauseOnMouseEnter: false,
    };
  }
  if (showPagination) {
    swiperModules.push(Pagination);
  }

  const effect = group.groupOptions?.effect || defaultGroupOptions.effect;

  switch (effect) {
    case "slide-in":
      swiperModules.push(EffectCreative);
      customProps.effect = "creative";
      customProps.creativeEffect = {
        prev: {
          translate: ["-20%", 0, -1],
          opacity: 0,
        },
        next: {
          translate: ["100%", 0, 0],
        },
      };
      break;
    case "slide-in-out":
      swiperModules.push(EffectCreative);
      customProps.effect = "creative";
      customProps.creativeEffect = {
        prev: {
          translate: ["-120%", 0, -500],
        },
        next: {
          translate: ["120%", 0, -500],
        },
      };
      break;
    case "slide-in-out-zoom":
      swiperModules.push(EffectCreative);
      customProps.effect = "creative";
      customProps.creativeEffect = {
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      };
      break;
    case "slide-3d":
      swiperModules.push(EffectCreative);
      customProps.effect = "creative";
      customProps.creativeEffect = {
        prev: {
          origin: "left center",
          translate: ["-5%", 0, -200],
          rotate: [0, 100, 0],
        },
        next: {
          origin: "right center",
          translate: ["5%", 0, -200],
          rotate: [0, -100, 0],
        },
      };
      break;
    case "cards":
      swiperModules.push(EffectCards);
      customProps.effect = "cards";
      customProps.cardsEffect = {
        slideShadows: false,
      };
      customCss.overflow = "visible";
      break;
    case "flip":
      swiperModules.push(EffectFlip);
      customProps.effect = "flip";
      customProps.flipEffect = {
        slideShadows: false,
      };

      break;
    default:
      customProps.effect = "slide";
      // Slide per view is only supported for flip effect for now
      customProps.slidesPerView =
        group.groupOptions?.slidesPerView || defaultGroupOptions.slidesPerView;
  }

  return (
    <Swiper
      key={`${group.i}-${group.groupOptions?.effect || "slide"}}`}
      data-group-id={group.i}
      modules={swiperModules}
      spaceBetween={0}
      pagination={{ clickable: true }}
      slidesPerView={1}
      touchStartPreventDefault={false}
      loop={loopEnabled}
      {...customProps}
    >
      {panels.map((panelId, panelIndex) => {
        const panel = getPanelFromDashboardState(dashboard, panelId);
        return (
          <SwiperSlide
            style={{ height: "100%", display: "flex", ...customCss }}
            key={`${panelIndex}`}
          >
            <Panel
              panel={panel}
              group={group}
              sidebar={props.sidebar}
              isInGroup
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
});

PanelsGroupSwiper.displayName = "PanelsGroupSwiper";

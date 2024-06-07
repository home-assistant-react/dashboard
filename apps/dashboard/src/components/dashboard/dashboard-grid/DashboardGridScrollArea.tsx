import { ScrollThumbVertical } from "@home-assistant-react/ui/src/components/overlay/scroll-area/ScrollThumbVertical";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const classes = {
  ScrollArea: "w-full relative flex-grow",
  ThumbVertical: "thumb-vertical cursor-pointer z-sticky",
};

export const DashboardGridScrollArea: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Scrollbars
      className={classes.ScrollArea}
      renderThumbVertical={ScrollThumbVertical}
      onScroll={(e) => {
        const target = document.getElementById("dashboard-sections-nav");
        if (!target) return;
        target.style.top = e.currentTarget.scrollTop + "px";
      }}
      autoHide
    >
      {children}
    </Scrollbars>
  );
};

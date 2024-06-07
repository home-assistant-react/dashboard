import { defaultGroupOptions } from "@home-assistant-react/types/src";
import React from "react";
import { PanelsGroupProps } from "./PanelsGroup.types";
import { Box } from "../../../../primitives/common";
import { cn } from "../../../../helpers";
import { PanelsGroupGrid } from "./PanelsGroupGrid";
import { PanelsGroupSwiper } from "./PanelsGroupSwiper";

export const PanelsGroup = React.forwardRef<HTMLDivElement, PanelsGroupProps>(
  (props, ref) => {
    const { group, children, ...rest } = props;
    const groupType =
      group.groupOptions?.groupType || defaultGroupOptions.groupType;

    return (
      <Box
        ref={ref}
        {...rest}
        className={cn(`panels-group-${group.i}`, rest.className)}
      >
        {groupType === "swiper" && <PanelsGroupSwiper {...props} />}
        {groupType === "grid" && <PanelsGroupGrid {...props} />}
        {children}
      </Box>
    );
  },
);

PanelsGroup.displayName = "PanelsGroup";

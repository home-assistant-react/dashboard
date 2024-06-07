import React from "react";
import { cn } from "../../../helpers";
import {
  BaseCard,
  BaseCardContent,
  BaseCardTitle,
} from "../../../primitives/Card";
import { Box } from "../../../primitives/common";

import { CardProps } from "./Card.types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, title, isGhost, className, headingProps, subtitle, ...rest },
    ref,
  ) => {
    return (
      <BaseCard
        className={cn(
          "overview:mb-0",
          isGhost
            ? "shadow-none rounded-none border-0 bg-transparent overview:p-0"
            : "shadow-md rounded-md p-6 overview:p-0",
          className,
        )}
        ref={ref}
        {...rest}
      >
        {title && (
          <BaseCardTitle
            {...headingProps}
            className={cn("pb-6 overview:pb-0", headingProps?.className)}
          >
            <Box>{title}</Box>
            {subtitle && (
              <Box className={"text-muted-foreground font-normal text-xs mt-2"}>
                {subtitle}
              </Box>
            )}
          </BaseCardTitle>
        )}
        <BaseCardContent className={"p-0 overview:p-4"}>
          {children}
        </BaseCardContent>
      </BaseCard>
    );
  },
);

Card.displayName = "Card";

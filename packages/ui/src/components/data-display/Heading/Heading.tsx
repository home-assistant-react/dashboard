import React from "react";
import { Box, BoxProps } from "../../../primitives/common";
import { headingVariants } from "./Heading.variants";

export interface HeadingProps extends BoxProps {}

export const Heading: React.FC<HeadingProps> = ({ as = "h2", ...rest }) => {
  const _classNames =
    typeof as === "string"
      ? headingVariants({
          variant: as as never,
          className: rest.className,
        })
      : "";
  return <Box as={as} {...rest} className={_classNames} />;
};

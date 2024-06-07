import React from "react";
import { Flex } from "../../primitives/common";
import { FormControlSlotProps } from "./FormControlWrapper.types";

export const FormControlSlot: React.FC<FormControlSlotProps> = (props) => {
  const { children, ...rest } = props;
  return <Flex {...rest}>{children}</Flex>;
};

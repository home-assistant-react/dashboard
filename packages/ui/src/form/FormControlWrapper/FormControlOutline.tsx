import React from "react";
import { Box } from "../../primitives/common";
import { cn } from "../../helpers";
import { useFormControlWrapper } from "./FormControlWrapperProvider";

export const FormControlOutline: React.FC = () => {
  const { isInvalid } = useFormControlWrapper();
  const isInvisible = !isInvalid;
  let ring = "ring-ring";
  if (isInvalid) {
    ring = "ring-red-700";
  }
  return (
    <Box
      className={cn(
        "nvst-form-control-wrapper-outline",
        "absolute inset-0 pointer-events-none z-0 ring-1 rounded-md",
        isInvisible ? "invisible" : "visible",
        ring,
      )}
    />
  );
};

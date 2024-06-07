import React from "react";
import { PropertyControllerWrapperProps } from "./PropertyControllerWrapper.types";
import { FormControlWrapper } from "../../../../components";

export const PropertyControllerWrapper = React.forwardRef<
  HTMLDivElement,
  PropertyControllerWrapperProps
>((props, ref) => {
  const { children, help, property, label, className, style } = props;
  return (
    <FormControlWrapper
      ref={ref}
      className={className}
      style={style}
      label={label !== undefined ? label : property.label}
      help={property.description || help}
      variant={"unstyled"}
    >
      {children}
    </FormControlWrapper>
  );
});

PropertyControllerWrapper.displayName = "PropertyControllerWrapper";

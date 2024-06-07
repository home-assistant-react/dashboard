import React from "react";
import { Span } from "../../primitives/common";
import { cn } from "../../helpers";
import { FormControlLabelProps } from "./FormControlWrapper.types";
import { useFormControlWrapper } from "./FormControlWrapperProvider";

export const FormControlLabel: React.FC<FormControlLabelProps> = (props) => {
  const { isInvalid } = useFormControlWrapper();
  const { children, className, isRequired, isOptional, ...rest } = props;
  const { id } = useFormControlWrapper();
  return (
    <label
      {...rest}
      className={cn(
        "flex items-center space-x-2 text-sm font-bold w-full justify-between",
        isInvalid && "text-semantic-error-foreground",
        className,
      )}
      htmlFor={props.htmlFor || id}
    >
      <Span>
        {children}
        {isRequired ? (
          <Span
            className={
              "inline-block px-1 text-semantic-error-foreground font-bold"
            }
          >
            *
          </Span>
        ) : undefined}
      </Span>
      {isOptional && <Span className="text-muted-foreground">Optional</Span>}
    </label>
  );
};

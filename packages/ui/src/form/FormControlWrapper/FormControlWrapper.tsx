import { mergeRefs } from "@home-assistant-react/helpers/src";
import React from "react";
import { Box, Flex } from "../../primitives/common";
import { cn } from "../../helpers";
import {
  FormControlWrapperContext,
  FormControlWrapperProvider,
} from "./FormControlWrapperProvider";
import { FormControlWrapperProps } from "./FormControlWrapper.types";
import { disabledCssClasses, formControlWrapperVariants } from "./defines";
import { FormControlLabel } from "./FormControlLabel";
import { FormControlWrapperContent } from "./FormControlWrapperContent";

export const FormControlWrapper = React.forwardRef<
  HTMLDivElement,
  FormControlWrapperProps
>((props, ref) => {
  const {
    children,
    wrapperClassName,
    className,
    enableSlotsInputFocus = false,
    enableWrapperInputFocus = false,
    hideEmptyMessages = false,
    ...rest
  } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const forwardFocusElement = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    containerRef?.current?.querySelector("input")?.focus();

    return false;
  };

  return (
    <FormControlWrapperProvider {...rest}>
      <FormControlWrapperContext.Consumer>
        {(state) => {
          const charactersCounter = state?.charactersCounter || 0;
          return (
            <Flex
              className={["w-full flex-col gap-2 relative", className]}
              ref={mergeRefs([ref, containerRef])}
              onClick={(event) => {
                if (
                  enableWrapperInputFocus &&
                  containerRef.current?.contains(event.target as HTMLElement)
                ) {
                  forwardFocusElement(event);
                }
              }}
            >
              {rest.label && (
                <FormControlLabel
                  isRequired={rest.isRequired}
                  isOptional={rest.isOptional}
                >
                  {rest.label}
                </FormControlLabel>
              )}
              {rest.description && (
                <Box className={"text-md text-muted-foreground"}>
                  {rest.description}
                </Box>
              )}
              <Box
                className={cn(
                  "py-1",
                  formControlWrapperVariants({ variant: rest.variant }),
                  disabledCssClasses,
                  wrapperClassName,
                )}
              >
                <FormControlWrapperContent
                  {...rest}
                  enableSlotsInputFocus={enableSlotsInputFocus}
                  slotFocusHandler={(e) => {
                    if (enableSlotsInputFocus) {
                      forwardFocusElement(e);
                    }
                  }}
                >
                  {children}
                </FormControlWrapperContent>
              </Box>
              {rest.showCounter && (
                <Box className={"text-xs text-muted-foreground text-right"}>
                  {rest.minLength && (
                    <>
                      {(!rest.maxLength ||
                        charactersCounter <= rest.minLength) && (
                        <span>
                          {charactersCounter} of {rest.minLength} characters
                          minimum
                        </span>
                      )}
                    </>
                  )}
                  {rest.maxLength &&
                    (!rest.minLength || charactersCounter > rest.minLength) && (
                      <span>
                        {charactersCounter} of {rest.maxLength} characters
                        maximum
                      </span>
                    )}
                </Box>
              )}
              {rest.helperText && (
                <Box className={"text-xs text-muted-foreground"}>
                  {rest.helperText}
                </Box>
              )}
              {(!hideEmptyMessages || !!rest.error) && (
                <Box
                  className={cn(
                    "text-xs text-semantic-error-foreground",
                    !hideEmptyMessages && "min-h-4",
                  )}
                >
                  {rest.error}
                </Box>
              )}
              {rest.success && (
                <Box
                  className={
                    "bottom-0 mb-[-20px] text-xs text-semantic-success-foreground"
                  }
                >
                  {rest.success}
                </Box>
              )}
            </Flex>
          );
        }}
      </FormControlWrapperContext.Consumer>
    </FormControlWrapperProvider>
  );
});

FormControlWrapper.displayName = "FormControlWrapper";

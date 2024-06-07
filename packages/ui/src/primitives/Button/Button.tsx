import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Box, Span } from "../common";
import { cn } from "../../helpers";
import { buttonVariants } from "./Button.variants";
import { ButtonProps } from "./Button.types";
import { Icon } from "../Icon";
import { PuffLoader } from "react-spinners";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      // General props
      isDisabled,
      className,
      asChild = false,
      isLoading,
      children,
      label,
      variant,
      size,
      icon,
      color,
      iconRight,
      wrapperClassName,
      // Properties inherited from HTML standard Button
      ...rest
    } = props;
    const ButtonComponent = asChild ? Slot : "button";

    const buttonVariant = variant;
    const buttonSize = size;
    const isButtonDisabled = isDisabled || isLoading;

    if (asChild) {
      return (
        <ButtonComponent
          className={cn(
            isLoading ? "relative" : undefined,
            buttonVariants({
              variant: buttonVariant,
              size: buttonSize,
              className,
            }),
          )}
          ref={ref}
          disabled={isButtonDisabled}
          data-is-loading={isLoading ? "" : undefined}
          {...rest}
        >
          {label}
          {children}
        </ButtonComponent>
      );
    }

    const buttonContent = (
      <>
        {icon ? (
          <Icon
            {...(typeof icon === "object" ? icon : {})}
            name={typeof icon === "object" ? icon.name : icon}
            className={cn(
              size == "lg" ? "size-5" : "size-4",
              typeof icon === "object" && icon?.className,
            )}
          />
        ) : null}
        {label}
        {children}

        {iconRight ? (
          <Icon
            {...(typeof iconRight === "object" ? iconRight : {})}
            name={typeof iconRight === "object" ? iconRight.name : iconRight}
            className={cn(
              size == "lg" ? "size-5" : "size-4",
              typeof iconRight === "object" && iconRight?.className,
            )}
          />
        ) : null}
      </>
    );

    return (
      <ButtonComponent
        className={cn(
          isLoading ? "relative" : undefined,
          buttonVariants({
            variant: buttonVariant,
            size: buttonSize,
            color,
            className,
          }),
        )}
        ref={ref}
        disabled={isButtonDisabled}
        data-is-loading={isLoading ? "" : undefined}
        type={"button"}
        {...rest}
      >
        <Span
          className={[
            "flex",
            "items-center",
            "h-full",
            "transition",
            "gap-1",
            isLoading ? "translate-y-full opacity-0" : "",
            wrapperClassName,
          ]}
        >
          {buttonContent}
        </Span>
        {isLoading && (
          <Box
            className={cn(
              "animate-in",
              "slide-in-from-top",
              "absolute",
              "left-50%",
              "top-50%",
            )}
          >
            <PuffLoader size={20} color={"white"} />
          </Box>
        )}
      </ButtonComponent>
    );
  },
);
Button.displayName = "Button";

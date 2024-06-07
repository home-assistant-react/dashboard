import { mergeRefs } from "@home-assistant-react/helpers/src";
import { useBooleanState } from "@home-assistant-react/hooks/src/useBooleanState";
import React from "react";
import { cn } from "../../helpers";
import { Button } from "../../primitives/Button";
import { FormControlWrapper } from "../FormControlWrapper";
import {
  TextInputProps,
  TextInputPropsWithFormControl,
} from "./TextInput.types";
import {
  disabledCssClasses,
  disabledOutlineClasses,
} from "../FormControlWrapper/defines";
import { FormControlOutline } from "../FormControlWrapper/FormControlOutline";
import { splitFormControlWrapperProps } from "../FormControlWrapper/helpers";
import { useFormControlWrapper } from "../FormControlWrapper/FormControlWrapperProvider";
import { FormControlSlot } from "../FormControlWrapper/FormControlSlot";

export const TextInputInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps
>((props, ref) => {
  const { inputClassName, className, type, ...rest } = props;
  const { id, setCharactersCounter, minLength, maxLength } =
    useFormControlWrapper();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isPasswordVisible = useBooleanState();

  React.useEffect(() => {
    const handleChange = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        setCharactersCounter?.(event.target.value.length || 0);
      }
    };

    inputRef?.current?.addEventListener("change", handleChange);

    return () => {
      inputRef?.current?.removeEventListener("change", handleChange);
    };
  }, [inputRef.current]);

  return (
    <>
      <input
        {...rest}
        className={cn(
          "flex h-8 w-full bg-transparent text-sm transition-colors placeholder:text-muted-foreground",
          disabledCssClasses,
          disabledOutlineClasses,
          className,
          inputClassName,
        )}
        maxLength={maxLength}
        minLength={minLength}
        ref={mergeRefs([ref, inputRef])}
        type={
          type === "password"
            ? isPasswordVisible.state
              ? "text"
              : "password"
            : type
        }
        id={id}
      />
      {type === "password" && (
        <FormControlSlot>
          <Button
            type={"button"}
            size={"xs"}
            icon={isPasswordVisible.state ? "Eye" : "EyeOff"}
            variant={"ghost"}
            onClick={() => isPasswordVisible?.toggle()}
          />
        </FormControlSlot>
      )}
    </>
  );
});

TextInputInput.displayName = "TextInputInput";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  TextInputPropsWithFormControl
>((props, ref) => {
  const [wrapperProps, inputProps] = splitFormControlWrapperProps(props);

  return (
    <FormControlWrapper enableSlotsInputFocus {...wrapperProps}>
      <TextInputInput ref={ref} {...inputProps} />
      <FormControlOutline />
    </FormControlWrapper>
  );
});

TextInput.displayName = "TextInput";

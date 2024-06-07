import { mergeRefs } from "@home-assistant-react/helpers/src";
import React from "react";
import { cn } from "../../helpers";
import { FormControlWrapper } from "../FormControlWrapper";
import {
  TextAreaInputProps,
  TextAreaInputPropsWithFormControl,
} from "./TextAreaInput.types";
import {
  disabledCssClasses,
  disabledOutlineClasses,
} from "../FormControlWrapper/defines";
import { FormControlOutline } from "../FormControlWrapper/FormControlOutline";
import { splitFormControlWrapperProps } from "../FormControlWrapper/helpers";
import { useFormControlWrapper } from "../FormControlWrapper/FormControlWrapperProvider";

export const TextAreaInputInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>((props, ref) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const { inputClassName, className, ...rest } = props;
  const { id, setCharactersCounter, maxLength, minLength } =
    useFormControlWrapper();

  React.useEffect(() => {
    const handleChange = (event: Event) => {
      if (event.target instanceof HTMLTextAreaElement) {
        setCharactersCounter?.(event.target.value.length || 0);
      }
    };

    textAreaRef?.current?.addEventListener("input", handleChange);

    return () => {
      textAreaRef?.current?.removeEventListener("input", handleChange);
    };
  }, [textAreaRef.current]);

  return (
    <textarea
      {...rest}
      maxLength={maxLength}
      minLength={minLength}
      className={cn(
        "flex min-h-20 w-full bg-transparent text-sm transition-colors placeholder:text-muted-foreground",
        disabledCssClasses,
        disabledOutlineClasses,
        className,
        inputClassName,
      )}
      ref={mergeRefs([ref, textAreaRef])}
      id={id}
    />
  );
});

TextAreaInputInput.displayName = "TextAreaInputInput";

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputPropsWithFormControl
>((props, ref) => {
  const [wrapperProps, inputProps] = splitFormControlWrapperProps(props);

  return (
    <FormControlWrapper enableSlotsInputFocus {...wrapperProps}>
      <TextAreaInputInput ref={ref} {...inputProps} />
      <FormControlOutline />
    </FormControlWrapper>
  );
});

TextAreaInput.displayName = "TextAreaInput";

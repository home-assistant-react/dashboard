import React from "react";
import { Switch } from "../../components";
import { cn } from "../../helpers";
import { Flex } from "../../primitives/common";
import { FormControlWrapper } from "../FormControlWrapper";
import {
  SwitchInputProps,
  SwitchInputPropsWithFormControl,
} from "./SwitchInput.types";
import { splitFormControlWrapperProps } from "../FormControlWrapper/helpers";
import { useFormControlWrapper } from "../FormControlWrapper/FormControlWrapperProvider";

const SwitchInputInput: React.FC<SwitchInputProps> = (props) => {
  const {
    inputClassName,
    value: controlledValue,
    onChangeValue,
    className,
    ...rest
  } = props;
  const { id } = useFormControlWrapper();
  const [selectedValue, setSwitchedValue] = React.useState<boolean>(false);

  const handleValueChange = (value: boolean) => {
    setSwitchedValue(value);
    onChangeValue?.(value);
  };

  const value = controlledValue ?? selectedValue;

  return (
    <Flex
      {...rest}
      className={cn("flex-row gap-2 w-full", inputClassName, className)}
      id={id}
    >
      <Switch checked={value} onCheckedChange={handleValueChange}></Switch>
    </Flex>
  );
};

export const SwitchInput = React.forwardRef<
  React.ElementRef<typeof FormControlWrapper>,
  SwitchInputPropsWithFormControl
>((props, ref) => {
  const [wrapperProps, inputProps] = splitFormControlWrapperProps(props);

  return (
    <FormControlWrapper
      variant={"unstyled"}
      wrapperClassName={"py-0"}
      enableSlotsInputFocus
      ref={ref}
      {...wrapperProps}
    >
      <SwitchInputInput {...inputProps} />
    </FormControlWrapper>
  );
});

SwitchInput.displayName = "SwitchInput";

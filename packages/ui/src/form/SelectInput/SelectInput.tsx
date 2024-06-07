import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../components";
import { Flex } from "../../primitives/common";
import { cn } from "../../helpers";
import { FormControlWrapper } from "../FormControlWrapper";
import {
  SelectInputProps,
  SelectInputPropsWithFormControl,
} from "./SelectInput.types";
import { splitFormControlWrapperProps } from "../FormControlWrapper/helpers";
import { useFormControlWrapper } from "../FormControlWrapper/FormControlWrapperProvider";

const SelectInputInput: React.FC<SelectInputProps> = (props) => {
  const {
    inputClassName,
    value: controlledValue,
    onChangeValue,
    className,
    children,
    placeholder,
    ...rest
  } = props;
  const { id } = useFormControlWrapper();
  const [selectedValue, setSelectedValue] = React.useState<
    string | undefined
  >();

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChangeValue?.(value);
  };

  const value = controlledValue ?? selectedValue;

  return (
    <Flex
      {...rest}
      className={cn("flex-row gap-2 w-full", inputClassName, className)}
      id={id}
    >
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger
          className={"h-[42px] data-[placeholder]:text-muted-foreground"}
        >
          <SelectValue className={""} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </Flex>
  );
};

export const SelectInput = React.forwardRef<
  React.ElementRef<typeof FormControlWrapper>,
  SelectInputPropsWithFormControl
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
      <SelectInputInput {...inputProps} />
    </FormControlWrapper>
  );
});

SelectInput.displayName = "SelectInput";

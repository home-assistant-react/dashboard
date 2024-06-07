import { mergeRefs } from "@home-assistant-react/helpers/src";
import React, { ChangeEvent } from "react";
import { Button } from "../../primitives/Button";
import { FormControlSlot } from "../FormControlWrapper/FormControlSlot";
import { NumberInputPropsWithFormControl } from "./NumberInput.types";
import { TextInput } from "../TextInput";

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputPropsWithFormControl
>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { onChange: controlledOnChange, ...rest } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledOnChange) {
      controlledOnChange(event);
    }
  };

  const addValue = (value: number) => {
    if (inputRef.current) {
      let newValue = Number(inputRef.current.value) + value;

      if (props.min !== undefined && newValue < Number(props.min)) {
        newValue = Number(props.min);
      } else if (props.max !== undefined && newValue > Number(props.max)) {
        newValue = Number(props.max);
      }

      inputRef.current.value = String(newValue);
      if (onChange) {
        onChange({
          target: inputRef.current as HTMLInputElement,
        } as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <TextInput
      type={"number"}
      ref={mergeRefs([ref, inputRef])}
      {...rest}
      leftSlot={[
        ...(props.leftSlot || []),
        <FormControlSlot key={"btn-minus"}>
          <Button
            variant={"ghost"}
            icon={"Minus"}
            onClick={() => addValue(-1)}
          />
        </FormControlSlot>,
      ]}
      rightSlot={[
        ...(props.leftSlot || []),
        <FormControlSlot key={"btn-plus"}>
          <Button variant={"ghost"} icon={"Plus"} onClick={() => addValue(1)} />
        </FormControlSlot>,
      ]}
      onChange={onChange}
    />
  );
});

NumberInput.displayName = "NumberInput";

import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { HookFormSwitchInputProps } from "./SwitchInput.types";
import { Controller, FieldValues } from "react-hook-form";
import { SwitchInput } from "./SwitchInput";

export function HookFormSwitchInput<T extends FieldValues>({
  form,
  name,
  rules,
  ...props
}: HookFormSwitchInputProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={buildControllerRules({
        form,
        name,
        rules,
        isRequired: props.isRequired,
      })}
      render={({ field, fieldState }) => (
        <SwitchInput
          ref={field.ref}
          {...props}
          value={field.value}
          onChangeValue={(value) => {
            field.onChange(value);
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

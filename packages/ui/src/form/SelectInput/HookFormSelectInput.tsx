import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { HookFormSelectInputProps } from "./SelectInput.types";
import { Controller, FieldValues } from "react-hook-form";
import { SelectInput } from "./SelectInput";

export function HookFormSelectInput<T extends FieldValues>({
  form,
  name,
  rules,
  ...props
}: HookFormSelectInputProps<T>) {
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
        <SelectInput
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

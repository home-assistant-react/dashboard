import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { buildErrorMessageForName } from "@home-assistant-react/helpers/src/hook-form/buildErrorMessageForName";
import { HookFormTextAreaInputProps } from "./TextAreaInput.types";
import { TextAreaInput } from "./TextAreaInput";
import { FieldValues } from "react-hook-form";

export function HookFormTextAreaInput<T extends FieldValues>(
  props: HookFormTextAreaInputProps<T>,
) {
  const { form, name, rules, ...rest } = props;
  return (
    <TextAreaInput
      {...form.register(
        name,
        buildControllerRules({
          form,
          name,
          rules,
          isRequired: props.isRequired,
          minLength: props.minLength,
          maxLength: props.maxLength,
        }),
      )}
      error={buildErrorMessageForName(form, name)}
      {...rest}
    />
  );
}

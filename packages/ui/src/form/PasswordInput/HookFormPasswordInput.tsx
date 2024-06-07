import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { buildErrorMessageForName } from "@home-assistant-react/helpers/src/hook-form/buildErrorMessageForName";
import { HookFormPasswordInputProps } from "./PasswordInput.types";
import { PasswordInput } from "./PasswordInput";
import { FieldValues } from "react-hook-form";

export function HookFormPasswordInput<T extends FieldValues>(
  props: HookFormPasswordInputProps<T>,
) {
  const { form, name, rules, ...rest } = props;
  return (
    <PasswordInput
      {...form.register(
        name,
        buildControllerRules({
          form,
          name,
          rules,
          isRequired: props.isRequired,
        }),
      )}
      error={buildErrorMessageForName(form, name)}
      {...rest}
      type={"password"}
    />
  );
}

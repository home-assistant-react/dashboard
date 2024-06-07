import { isValidEmail } from "@home-assistant-react/helpers/src";
import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { buildErrorMessageForName } from "@home-assistant-react/helpers/src/hook-form/buildErrorMessageForName";
import { gt } from "@home-assistant-react/helpers/src/i18n/gt";
import { HookFormEmailInputProps } from "./EmailInput.types";
import { EmailInput } from "./EmailInput";
import { FieldValues } from "react-hook-form";

export function HookFormEmailInput<T extends FieldValues>(
  props: HookFormEmailInputProps<T>,
) {
  const { form, name, rules, ...rest } = props;
  return (
    <EmailInput
      {...form.register(
        name,
        buildControllerRules({
          form,
          name,
          rules: {
            validate: (email) =>
              !email
                ? props.isRequired
                  ? gt("errorMessages.requiredField") ||
                    `${props.label} is required`
                  : undefined
                : isValidEmail(email)
                  ? undefined
                  : `${props.label} is invalid`,
            ...rules,
          },
          isRequired: props.isRequired,
        }),
      )}
      error={buildErrorMessageForName(form, name)}
      {...rest}
    />
  );
}

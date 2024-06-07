import { buildControllerRules } from "@home-assistant-react/helpers/src/hook-form/buildControllerRules";
import { buildErrorMessageForName } from "@home-assistant-react/helpers/src/hook-form/buildErrorMessageForName";
import { gt } from "@home-assistant-react/helpers/src/i18n/gt";
import { isValidUrl } from "@home-assistant-react/helpers/src/validators/isValidUrl";
import { HookFormUrlInputProps } from "./UrlInput.types";
import { UrlInput } from "./UrlInput";
import { FieldValues } from "react-hook-form";

export function HookFormUrlInput<T extends FieldValues>(
  props: HookFormUrlInputProps<T>,
) {
  const { form, name, rules, requireProtocol = true, ...rest } = props;
  return (
    <UrlInput
      {...form.register(
        name,
        buildControllerRules({
          form,
          name,
          rules: {
            validate: (email) =>
              !email
                ? props.isRequired
                  ? gt("errorMessages.requiredField")
                  : undefined
                : isValidUrl(email, requireProtocol)
                  ? undefined
                  : `${props.label} is not a valid URL`,
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

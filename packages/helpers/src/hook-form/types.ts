import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export interface HookFormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  requiredErrorMessage?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
}

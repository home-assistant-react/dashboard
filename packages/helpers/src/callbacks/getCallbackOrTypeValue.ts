import { CallbackOrType } from "@home-assistant-react/types/src/common/callback-or-type";

export function getCallbackOrTypeValue<TValue, TOptions>(
  value: CallbackOrType<TValue, TOptions>,
  options: TOptions,
): TValue {
  if (typeof value === "function") {
    if (value instanceof Function && typeof value === "function") {
      return (value as (options?: TOptions) => TValue)(options);
    }
  }
  return value;
}

import { Panel } from "../panels";

export interface PropertyControllerState<T = unknown> {
  value: T;
  setValue: (value: T) => void;
  resetValue: () => void;
  hasChanges: boolean;
  hasError: boolean;
  panel?: Panel;
}

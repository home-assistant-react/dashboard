import { Dispatch, SetStateAction } from "react";

export interface UseBooleanReturn {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: Dispatch<SetStateAction<boolean>>;
}

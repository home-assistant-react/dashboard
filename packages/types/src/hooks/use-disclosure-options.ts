import { Dict } from "../common";

export interface UseDisclosureOptions<TDisclosureData extends Dict = Dict> {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  data?: TDisclosureData;
}

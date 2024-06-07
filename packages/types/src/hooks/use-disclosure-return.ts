import { Dict } from "../common";

export interface UseDisclosureReturn<TDisclosureData = Dict> {
  isOpen: boolean;
  open(data?: TDisclosureData): void;
  onOpen(data?: TDisclosureData): void;
  close(data?: TDisclosureData): void;
  onClose(data?: TDisclosureData): void;
  toggle(data?: TDisclosureData): void;
  setOpen(isOpen: boolean, data?: TDisclosureData): void;
  onOpenChange(isOpen: boolean, data?: TDisclosureData): void;
  isControlled: boolean;
  data?: TDisclosureData;
}

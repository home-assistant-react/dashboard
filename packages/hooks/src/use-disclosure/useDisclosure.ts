import {
  Dict,
  UseDisclosureOptions,
  UseDisclosureReturn,
} from "../../../types/src";
import { useCallbackRef } from "../use-callback-ref";
import { useBooleanValue } from "../use-boolean-value";
import React from "react";

export function useDisclosure<TData extends Dict = Dict>(
  options: UseDisclosureOptions<TData> = {},
): UseDisclosureReturn<TData> {
  const isOpenState = useBooleanValue(options.defaultIsOpen || false);
  const [data, setData] = React.useState<TData>(options.data as TData);

  const handleOpen = useCallbackRef(options.onOpen);
  const handleClose = useCallbackRef(options.onClose);

  const isOpen =
    options.isOpen !== undefined ? options.isOpen : isOpenState.value;
  const isControlled = options.isOpen !== undefined;

  const open = React.useCallback(
    (data: TData) => {
      setData(data);
      if (!isControlled) {
        isOpenState.setTrue();
      }
      handleOpen?.();
    },
    [isControlled, handleOpen],
  );

  const close = React.useCallback(
    (data: TData) => {
      if (data !== undefined) setData(data);
      if (!isControlled) {
        isOpenState.setFalse();
      }
      handleClose?.();
    },
    [isControlled, handleClose],
  );

  const toggle = React.useCallback(
    (data: TData) => {
      setData(data);
      if (isOpen) {
        close(data);
      } else {
        open(data);
      }
    },
    [isOpen, open, close],
  );

  const setOpen = React.useCallback(
    (isOpen: boolean, data: TData) => {
      setData(data);
      if (!isOpen) {
        close(data);
      } else {
        open(data);
      }
    },
    [isOpen, open, close],
  );

  return {
    isOpen,
    open,
    onOpen: open,
    close,
    onClose: close,
    toggle,
    isControlled,
    data,
    setOpen,
    onOpenChange: setOpen,
  };
}

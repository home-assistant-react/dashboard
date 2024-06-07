import React from "react";
import { TextInput } from "../../../form/TextInput";
import { cn } from "../../../helpers";
import { Box, Flex } from "../../../primitives/common";
import { ConfirmModal } from "../ConfirmModal";
import { DeleteConfirmModalProps } from "./DeleteConfirmModal.types";

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  message: userMessage,
  confirmText = "",
  onOpenChange,
  confirmProps,
  footerProps,
  ...props
}) => {
  const [inputConfirmText, setInputConfirmText] = React.useState("");

  const onClose = () => {
    setInputConfirmText("");
    onOpenChange?.(false);
  };

  return (
    <ConfirmModal
      confirmProps={{
        variant: "destructive",
        isDisabled: inputConfirmText !== confirmText,
        ...confirmProps,
      }}
      footerProps={{
        ...footerProps,
        className: cn(
          "justify-between flex-row-reverse",
          footerProps?.className,
        ),
      }}
      message={
        <Flex className={"flex-col gap-8"}>
          <Box className={"w-full"}>{userMessage}</Box>
          {confirmText && (
            <>
              <Box>
                Please type <strong>&quot;{confirmText}&quot;</strong> in field
                below, then click red button to continue.
              </Box>
              <TextInput
                className={"w-full"}
                placeholder={confirmText}
                inputClassName={"text-center"}
                onChange={(e) => setInputConfirmText(e.target.value || "")}
              />
            </>
          )}
        </Flex>
      }
      onOpenChange={(isOpen) => !isOpen && onClose()}
      {...props}
    ></ConfirmModal>
  );
};

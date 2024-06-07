import React from "react";
import { cn } from "../../../helpers";
import { Alert, AlertDescription, AlertTitle } from "../../../primitives/Alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../../primitives/AlertDialog";
import { Button } from "../../../primitives/Button";
import { Icon } from "../../../primitives/Icon";
import { Box, Flex } from "../../../primitives/common";
import { ModalProps } from "./Modal.types";

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => {
    const {
      isOpen,
      onOpenChange,
      error,
      closeOnOverlayClick = true,
      showModalClose = true,
      children,
      title,
      titleProps,
      footerProps,
      footer,
      icon,
      iconProps,
    } = props;

    const handleClose = () => {
      onOpenChange?.(false);
    };

    return (
      <AlertDialog onOpenChange={onOpenChange} open={isOpen}>
        <AlertDialogContent
          ref={ref}
          overlayProps={{
            onClick: closeOnOverlayClick ? handleClose : undefined,
          }}
          className={"p-0 overflow-hidden"}
        >
          <Flex className={"items-center gap-6"}>
            {icon && (
              <Icon
                name={icon}
                {...iconProps}
                className={cn("h-20 w-20", iconProps?.className)}
              />
            )}
            <Flex className={"flex-col gap-4 w-full"}>
              {showModalClose && (
                <Box className={"absolute right-3 top-3"}>
                  <Button variant={"ghost"} onClick={handleClose}>
                    <Icon name={"X"} className={"w-5"} />
                  </Button>
                </Box>
              )}
              {title && (
                <AlertDialogTitle
                  className={"bg-muted px-6 py-4"}
                  {...titleProps}
                >
                  {title}
                </AlertDialogTitle>
              )}
              {children && (
                <AlertDialogDescription className={"py-4 px-6"}>
                  {children}
                </AlertDialogDescription>
              )}
            </Flex>
          </Flex>
          {error && (
            <Alert variant="destructive">
              <Icon name={"TriangleAlert"} className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {footer && (
            <AlertDialogFooter
              {...footerProps}
              className={cn("w-full px-6 pb-4 gap-2", footerProps?.className)}
            >
              {footer}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

Modal.displayName = "Modal";

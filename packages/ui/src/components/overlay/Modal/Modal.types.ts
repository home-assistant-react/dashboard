import React, { PropsWithChildren } from "react";
import {
  AlertDialogFooterProps,
  AlertDialogTitleProps,
} from "../../../primitives/AlertDialog";
import { IconName, IconProps } from "../../../primitives/Icon/Icon.types";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  closeOnOverlayClick?: boolean;
  error?: React.ReactNode;
  title?: React.ReactNode;
  showModalClose?: boolean;
  titleProps?: AlertDialogTitleProps;
  footerProps?: AlertDialogFooterProps;
  footer?: React.ReactNode;
  icon?: IconName;
  iconProps?: Partial<Omit<IconProps, "name">>;
}

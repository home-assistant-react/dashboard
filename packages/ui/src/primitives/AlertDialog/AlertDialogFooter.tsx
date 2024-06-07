import * as React from "react";
import { cn } from "../../helpers";
import { Flex } from "../common";

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => (
  <Flex
    className={cn("flex-col-reverse sm:flex-row sm:justify-end", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

import { AvatarImageProps } from "@radix-ui/react-avatar";

export interface AvatarProps extends Pick<AvatarImageProps, "src" | "alt"> {
  name?: string;
  className?: string;
}

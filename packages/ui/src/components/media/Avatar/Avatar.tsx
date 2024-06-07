import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { AvatarProps } from "./Avatar.types";
import { cn } from "../../../helpers";
import { getRandomColor } from "@home-assistant-react/helpers/src";

const classes = {
  Wrapper: "rounded-full overflow-hidden inline-flex",
  Image: "aspect-square w-full h-full",
  Fallback: "flex w-full h-full items-center justify-center bg-muted",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const nameLetters = String(props.name || "")
      .split(" ")
      .map((name) => name[0])
      .slice(0, 2);
    return (
      <AvatarPrimitive.Avatar
        className={cn(classes.Wrapper, props.className)}
        ref={ref}
      >
        <AvatarPrimitive.Image
          src={props.src}
          alt={props.alt}
          className={classes.Image}
        />
        <AvatarPrimitive.Fallback
          style={{ backgroundColor: getRandomColor({ string: props.name }) }}
          ref={ref}
          className={classes.Fallback}
        >
          {nameLetters}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Avatar>
    );
  },
);

Avatar.displayName = "Avatar";

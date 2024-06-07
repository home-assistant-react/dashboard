import React from "react";
import { Button } from "../../primitives/Button";
import { Icon } from "../../primitives/Icon";
import { useLayout } from "./LayoutProvider";

export interface ThemeToggleProps {
  withBackground?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ withBackground }) => {
  const { setTheme, theme } = useLayout();

  return (
    <Button
      variant={withBackground ? "outline" : "ghost"}
      size="icon"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <Icon
        name="SunMedium"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icon
        name="Moon"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

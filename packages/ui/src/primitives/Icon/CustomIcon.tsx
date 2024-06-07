import { useHass } from "@home-assistant-react/api/src";
import React from "react";
import { CustomSvgIcon } from "../../components";

export const CustomIcon: React.FC<{ id: string; size?: number }> = ({
  id,
  size = 32,
}) => {
  const { customIcons } = useHass();
  const icon = customIcons?.[id];
  if (!icon) return null;
  return <CustomSvgIcon icon={icon} width={size} height={size} />;
};

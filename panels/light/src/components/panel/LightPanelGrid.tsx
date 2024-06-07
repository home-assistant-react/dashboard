import React from "react";
import { Box, Grid, GridProps, Switch } from "@home-assistant-react/ui/src";
import { GoLightBulb, HiLightBulb } from "@home-assistant-react/icons/src";
import { useComputeStateDisplay } from "@home-assistant-react/api/src";
import { useLightPanel } from "../LightPanelProvider";

const classes = {
  Wrapper:
    "w-full h-full p-6 flex-col relative grid-rows-[1fr_auto] grid-cols-[1fr_auto]",
  HalfWrapper: "grid-cols-1 text-white",
  Icon: "flex-grow text-4xl",
  AreaInfo: "text-muted-foreground text-xs",
  Name: "text-md font-semibold flex-grow",
  State: "font-semibold text-xs",
};

interface LightPanelGridProps extends GridProps {
  isHalf?: boolean;
  rightSideRef?: React.Ref<HTMLDivElement>;
  showToggle?: boolean;
  showStatus?: boolean;
}

export const LightPanelGrid: React.FC<LightPanelGridProps> = ({
  isHalf,
  rightSideRef,
  showToggle,
  showStatus,
  ...rest
}) => {
  const { lightEntity, isLightOn } = useLightPanel();

  const entityDisplayState = useComputeStateDisplay(lightEntity);
  const showRightSide =
    !isHalf && (showToggle !== false || showStatus !== false);

  return (
    <Grid
      className={[classes.Wrapper, isHalf ? classes.HalfWrapper : ""]}
      {...rest}
    >
      <Box style={{ alignSelf: "flex-start", justifySelf: "flex-start" }}>
        <Box className={classes.Icon}>
          {!isLightOn ? <GoLightBulb /> : <HiLightBulb />}
        </Box>
      </Box>
      {(!isHalf || showRightSide) && (
        <Box style={{ alignSelf: "flex-start", justifySelf: "flex-end" }}>
          {showToggle !== false && <Switch checked={isLightOn} />}
        </Box>
      )}
      <Box className={classes.AreaInfo}>
        {lightEntity?.area?.name || " "}
        <Box className={classes.Name}>
          {lightEntity?.attributes.friendly_name || " "}
        </Box>
      </Box>

      {(!isHalf || showRightSide) && (
        <Box ref={rightSideRef} className={classes.State}>
          {showStatus !== false ? entityDisplayState : undefined}
        </Box>
      )}
    </Grid>
  );
};

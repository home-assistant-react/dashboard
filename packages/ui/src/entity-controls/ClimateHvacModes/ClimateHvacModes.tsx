import { useGetComputeStateDisplay } from "@home-assistant-react/api/src/hooks/useGetComputeStateDisplay";
import { computeStateColorProperties } from "@home-assistant-react/helpers/src/home-assistant/computeStateColorProperties";
import { getClimateHvacModeIcon } from "@home-assistant-react/helpers/src/home-assistant/entities/climate";
import { HvacMode } from "@home-assistant-react/types/src";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../../components";
import { ClimateHvacModesProps } from "./ClimateHvacModes.types";

export const ClimateHvacModes: React.FC<ClimateHvacModesProps> = ({
  climateEntity,
}) => {
  const computeStateDisplay = useGetComputeStateDisplay();
  const hvacModes = React.useMemo(() => {
    return (climateEntity.attributes?.hvac_modes || []).concat();
  }, [climateEntity.attributes?.hvac_modes]);

  const handleHvacModeChange = (mode: string) => {
    climateEntity.services.setHvacMode({ hvac_mode: mode as HvacMode });
  };

  return (
    <>
      <ToggleGroup
        type={"single"}
        value={climateEntity.state}
        onValueChange={handleHvacModeChange}
      >
        {hvacModes.map((mode) => {
          return (
            <ToggleGroupItem
              key={mode}
              icon={getClimateHvacModeIcon(mode)}
              style={
                mode === climateEntity.state
                  ? {
                      backgroundColor: `var(${computeStateColorProperties(climateEntity)![0]})`,
                    }
                  : undefined
              }
              value={mode}
            >
              {computeStateDisplay(climateEntity, { state: mode })}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </>
  );
};

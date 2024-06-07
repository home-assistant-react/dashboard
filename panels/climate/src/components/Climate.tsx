import { useClimateEntity } from "@home-assistant-react/hooks/src/entities/useClimateEntity";
import { PanelFC } from "@home-assistant-react/types/src";
import { Box, Flex } from "@home-assistant-react/ui/src";
import { ClimateHvacModes } from "@home-assistant-react/ui/src/entity-controls/ClimateHvacModes/ClimateHvacModes";
import { ClimateSlider } from "@home-assistant-react/ui/src/entity-controls/ClimateSlider";
import { ClimateOptions } from "../defines/types";

export const Climate: PanelFC<ClimateOptions> = (props) => {
  const options = props.panel.options;
  const entityId = options?.entity_id || "";
  const entity = useClimateEntity(entityId);
  if (!entity) return;

  console.log(entity);

  return (
    <Box>
      <Flex className={"flex-col gap-6 items-center justify-center h-full"}>
        <ClimateHvacModes climateEntity={entity} />
        <ClimateSlider
          mode={"start"}
          value={entity.attributes.temperature}
          current={entity.attributes.current_temperature}
          min={entity.attributes.min_temp}
          max={entity.attributes.max_temp}
          low={10}
          high={20}
        />
      </Flex>
    </Box>
  );
};

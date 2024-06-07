import React from "react";
import { SelectInput } from "../../form/SelectInput";
import { LightEffectSelectProps } from "./LightEffectSelect.types";
import { Box } from "../../primitives/common";
import { capitalize } from "@home-assistant-react/helpers/src";
import { Select, SelectItem } from "../../components";
import { useLightServices } from "@home-assistant-react/api/src/services/light";

export const LightEffectSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  LightEffectSelectProps
>((props, ref) => {
  const { entity, ...rest } = props;
  const light = useLightServices(entity);

  return (
    <SelectInput
      value={entity.attributes?.effect}
      placeholder={"No effects"}
      onChangeValue={async (value) => {
        await light.setEffect(value);
      }}
      ref={ref}
      {...rest}
    >
      {entity.attributes?.effect_list?.map((effect) => (
        <SelectItem value={effect} key={effect}>
          <Box>{capitalize(effect)}</Box>
        </SelectItem>
      ))}
    </SelectInput>
  );
});

LightEffectSelect.displayName = "LightEffectSelect";

import { useHassGetEntitiesOnce } from "@home-assistant-react/api/src/hooks";
import { Button, Flex } from "@home-assistant-react/ui/src";
import { PropertyControllerWrapper } from "@home-assistant-react/ui/src/editor";
import {
  PanelEditorConfigEntity,
  PropertyControllerFc,
} from "@home-assistant-react/types/src";
import { EntityPickerInput } from "@home-assistant-react/ui/src/components/controls/EntityPickerInput";

export const PropertyControllerEntity: PropertyControllerFc<
  PanelEditorConfigEntity
> = (props) => {
  const entities = useHassGetEntitiesOnce({ domain: props.property.domain });

  const clearValue = () => {
    props.onChange(undefined);
  };

  return (
    <PropertyControllerWrapper
      style={{ gridColumnStart: 1, gridColumnEnd: 4 }}
      help={"The entity to use for this panel."}
      {...props}
    >
      <Flex className={"w-full gap-2"}>
        <EntityPickerInput
          onValueChange={(value) =>
            props.onChange(value !== "" ? value : undefined)
          }
          value={props.value}
          entities={entities}
        />
        {!!props.value && (
          <Button icon={"X"} variant={"ghost"} onClick={clearValue} />
        )}
      </Flex>
    </PropertyControllerWrapper>
  );
};

import { registerPropertyControllerComponent } from "@home-assistant-react/api/src/dashboard";
import { PropertyControllerDirection } from "@home-assistant-react/property-controller-direction/src";
import { PropertyControllerToggle } from "@home-assistant-react/property-controller-toggle/src";
import { EditorPropertyType } from "@home-assistant-react/types/src";
import { PropertyControllerEntity } from "@home-assistant-react/property-controller-entity/src";
import { PropertyControllerSelect } from "@home-assistant-react/property-controller-select/src";
import { PropertyControllerVisibility } from "@home-assistant-react/property-controller-visibility/src";
import { PropertyControllerNumber } from "@home-assistant-react/property-controller-number/src";
import { PropertyControllerText } from "@home-assistant-react/property-controller-text/src";
import { PropertyControllerIcon } from "@home-assistant-react/property-controller-icon/src";
import { PropertyControllerYesNo } from "@home-assistant-react/property-controller-yesno/src";

export const registerPropertyControllerComponents = () => {
  registerPropertyControllerComponent(
    EditorPropertyType.Entity,
    PropertyControllerEntity,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Select,
    PropertyControllerSelect,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Direction,
    PropertyControllerDirection,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Visibility,
    PropertyControllerVisibility,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Number,
    PropertyControllerNumber,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Text,
    PropertyControllerText,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Icon,
    PropertyControllerIcon,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.YesNo,
    PropertyControllerYesNo,
  );

  registerPropertyControllerComponent(
    EditorPropertyType.Toggle,
    PropertyControllerToggle,
  );
};

import { PanelFC } from "@home-assistant-react/types/src";
import { LightInner } from "./panel/LightInner";
import { LightPanelProvider } from "./LightPanelProvider";
import { LightOptions } from "../defines/types";

export const Light: PanelFC<LightOptions> = (props) => {
  const options = props.panel.options;

  return (
    <LightPanelProvider options={options}>
      <LightInner />
    </LightPanelProvider>
  );
};

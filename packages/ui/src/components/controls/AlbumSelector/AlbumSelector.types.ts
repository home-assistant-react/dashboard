import { AlbumValue } from "@home-assistant-react/types/src/api";

export interface AlbumSelectorProps {
  value?: AlbumValue[];
  onChange?: (value: AlbumValue[]) => void;
}

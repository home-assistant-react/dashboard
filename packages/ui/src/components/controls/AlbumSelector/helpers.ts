import { AlbumValue } from "@home-assistant-react/types/src/api";
import { v4 as uuid } from "uuid";

export const getEmptyAlbumValue = (): AlbumValue => ({
  integration: "",
  key: uuid(),
  auth_key: "",
  album_id: "",
});

import React from "react";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { useApi } from "@home-assistant-react/api/src";
import { AlbumValue, PhotoAlbum } from "@home-assistant-react/types/src/api";
import { SelectInput } from "../../../form/SelectInput";
import { Button } from "../../buttons";
import { Flex } from "../../../primitives/common";
import { AuthenticatedImage } from "../../media";
import { CloudApiTargetSelector } from "../CloudApiTargetSelector";
import { SelectItem } from "../select";

const classes = {
  Image: "overflow-hidden rounded-sm",
};

export const AlbumSelectItem: React.FC<{
  value: AlbumValue;
  onSelect: (
    integrationName: string,
    authKey: string,
    albumId?: string,
  ) => void;
  onDelete: () => void;
}> = ({ value, onSelect, onDelete }) => {
  const api = useApi();
  const [albums, setAlbums] = React.useState<PhotoAlbum[] | null>(null);
  React.useEffect(() => {
    if (value.integration && value.auth_key) {
      setAlbums(null);
      api
        .getAlbums(value.integration, value.auth_key)
        .then((albums) => {
          setAlbums(albums || []);
        })
        .catch(() => {
          setAlbums([]);
        });
    }
  }, [value.integration, value.auth_key]);

  const isIntegrationSelected = !!value.integration && !!value.auth_key;

  return (
    <>
      <Flex
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Flex
          style={{
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: "100%",
            borderRight: "1px solid #efefef",
            paddingRight: 12,
            marginRight: 6,
          }}
        >
          <CloudApiTargetSelector
            valueIntegration={value.integration || ""}
            valueAuthKey={value.auth_key || ""}
            onChange={onSelect}
          />

          <SelectInput
            label={"Album"}
            isLoading={isIntegrationSelected && albums === null}
            value={value.album_id || ""}
            isDisabled={!isIntegrationSelected || !albums?.length}
            onChangeValue={(albumId) => {
              onSelect(value.integration, value.auth_key, albumId);
            }}
          >
            {albums?.map((album) => (
              <SelectItem key={album.id} value={album.id}>
                <Flex style={{ alignItems: "center", gap: 12 }}>
                  <AuthenticatedImage
                    className={classes.Image}
                    photoId={album.coverPhotoId}
                    integrationName={value.integration}
                    authKey={value.auth_key}
                    w={30}
                    h={30}
                    allowCache
                  />
                  {album.title}
                </Flex>
              </SelectItem>
            ))}
          </SelectInput>
        </Flex>
        <Button onClick={onDelete} variant={"ghost"}>
          {getMdiIcon("deleteOutline", { size: 0.8 })}
        </Button>
      </Flex>

      <hr />
    </>
  );
};

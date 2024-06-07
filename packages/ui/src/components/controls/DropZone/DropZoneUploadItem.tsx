import React, { ReactNode } from "react";
import { Button } from "../../buttons";
import { Box, Grid } from "../../../primitives/common";
import { dropZoneFileIcons } from "./defines";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import {
  isFileUploading,
  isFileWaitingForUpload,
  isUploadFileSuccess,
  uploadFileHasError,
} from "./helpers";
import { Spinner } from "../../feedback/Spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../overlay";
import { UploadFile } from "@home-assistant-react/types/src";

export interface DropZoneUploadItemProps {
  file: UploadFile;
  fileIndex: number;
  abortUpload: (fileIndex: number) => void;
}

export const DropZoneUploadItem: React.FC<DropZoneUploadItemProps> = ({
  file,
  fileIndex,
  abortUpload,
}) => {
  let IconComponent: ReactNode = null;

  if (file.file && file.type?.startsWith("image/")) {
    IconComponent = (
      <Box style={{ width: 30, overflow: "hidden" }}>
        <img style={{ width: "100%" }} src={URL.createObjectURL(file.file)} />
      </Box>
    );
  } else if (
    file.extension &&
    dropZoneFileIcons[file.extension as keyof typeof dropZoneFileIcons]
  ) {
    IconComponent = getMdiIcon(
      dropZoneFileIcons[file.extension as keyof typeof dropZoneFileIcons],
    );
  } else {
    IconComponent = getMdiIcon("file");
  }

  return (
    <Grid
      className={
        "rounded-md gap-2 p-4 bg-muted grid-cols-[auto_1fr_auto] items-center min-w-[250px]"
      }
      key={fileIndex}
    >
      <Box>{IconComponent}</Box>
      <Box>{file.name}</Box>
      <Box className={"relative"}>
        {(isFileWaitingForUpload(file) || isFileUploading(file)) && (
          <>
            <Spinner
              size={30}
              isIndeterminate={!isFileUploading(file)}
              style={!isFileUploading(file) ? { opacity: 0.3 } : undefined}
              value={
                isFileUploading(file) ? (file.progress || 0) / 100 : undefined
              }
            />
            <Button variant={"ghost"} onClick={() => abortUpload(fileIndex)}>
              {getMdiIcon("close")}
            </Button>
          </>
        )}
        {uploadFileHasError(file) && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger className={"ext-semantic-error-foreground"}>
              {getMdiIcon("alert")}
            </TooltipTrigger>
            <TooltipContent>{file.error || "Unknown error"}</TooltipContent>
          </Tooltip>
        )}
        {isUploadFileSuccess(file) && <>{getMdiIcon("check")}</>}
      </Box>
    </Grid>
  );
};

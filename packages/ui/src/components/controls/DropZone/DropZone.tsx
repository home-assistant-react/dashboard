import React from "react";
import { Button } from "../../buttons";
import { Box, Flex } from "../../../primitives/common";
import { useToastError } from "../../overlay";
import { DropZoneProps } from "./DropZone.types";
import {
  useBooleanValue,
  useDragDetect,
} from "@home-assistant-react/hooks/src";
import {
  booleanDataAttr,
  getApiError,
} from "@home-assistant-react/helpers/src";
import { getMdiIcon } from "@home-assistant-react/icons/src";
import { UploadFile } from "@home-assistant-react/types/src";
import {
  filterFilesToUpload,
  isFileUploading,
  isFileWaitingForUpload,
  isUploadFileCompleted,
} from "./helpers";
import { DropZoneUploadItem } from "./DropZoneUploadItem";

const classes = {
  DropZone:
    "animate-in fade-in border-2 border-dashed rounded-sm text-sm items-center justify-center absolute inset-0 bg-secondary",
  DropZoneDragOver: "bg-accent border-primary",
  Content: "transition-all items-center justify-center flex-col p-4 text-lg",
  UploadInfo: "",
  SelectFileButton: "absolute inset-0 opacity-0 hover:cursor-pointer",
  DropZoneReceiver: "absolute inset-0 bg-accent/10",
};

export const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(
  (
    {
      supportedExtensions,
      supportedMimeTypes,
      fileMaxSize,
      simultaneousUploads = 1,
      fileUploaderGetter,
      closeOnFinish,
      onFinish,
      isOpen,
      onOpenChange,
      allowMultiple = true,
      maxUploadFiles = 0,
      onErrors,
    },
    ref,
  ) => {
    const isDragDetected = useDragDetect();
    const isDragOver = useBooleanValue();
    const toastError = useToastError();
    const filesToUpload = React.useRef<UploadFile[]>([]);
    //const [filesToUpload, setFilesToUpload] = React.useState<UploadFile[]>([]);
    const [, setStateUpdate] = React.useState(0);

    const updateFilesToUpload = (
      changes: Partial<UploadFile>,
      fileIndex: number,
    ) => {
      filesToUpload.current[fileIndex] = {
        ...filesToUpload.current[fileIndex],
        ...changes,
      };

      setStateUpdate((stateUpdate) => stateUpdate + 1);

      const completedUploads = filesToUpload.current.filter(
        isUploadFileCompleted,
      );
      if (completedUploads.length === filesToUpload.current.length) {
        if (closeOnFinish) {
          filesToUpload.current = [];
          setStateUpdate((stateUpdate) => stateUpdate + 1);
          onOpenChange?.(false);
        }

        onFinish?.(completedUploads.filter((file) => !file.error));

        return;
      }

      startUploads();
    };

    const startUploads = async (
      newFiles?: UploadFile[],
      _fileToUpload?: UploadFile[],
    ) => {
      let files = _fileToUpload || filesToUpload.current || [];
      if (Array.isArray(newFiles) && !!newFiles.length) {
        filesToUpload.current = [...files, ...newFiles];
        files = filesToUpload.current;
      }

      const startedUploads = files.filter(isFileUploading);

      if (startedUploads.length >= simultaneousUploads) return;
      let newStartedUploads = 0;
      const allowedUploads = simultaneousUploads - startedUploads.length;

      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        if (!isFileWaitingForUpload(file)) continue;
        if (newStartedUploads >= allowedUploads) break;
        newStartedUploads++;
        file.isUploading = true;
        file.progress = 0;
        if (file.file) {
          file.handler = await fileUploaderGetter({
            onUploadProgress: (progress) =>
              updateFilesToUpload({ progress: progress.percentage }, fileIndex),
            onCancel: () =>
              updateFilesToUpload(
                { isUploading: false, isCanceled: true },
                fileIndex,
              ),
            onError: (error) => {
              if (onErrors) onErrors([getApiError(error)]);
              updateFilesToUpload(
                {
                  isUploading: false,
                  error: getApiError(error),
                  errorType: "unknown",
                },
                fileIndex,
              );
            },
            onSuccess: () =>
              updateFilesToUpload(
                { isUploading: false, isUploaded: true },
                fileIndex,
              ),
          });
          file.handler.uploadFile(file.file);
        }

        filesToUpload.current[fileIndex] = file;
      }

      setStateUpdate((stateUpdate) => stateUpdate + 1);
    };

    const abortUpload = (fileIndex: number) => {
      const file = filesToUpload.current[fileIndex];
      if (!file || !file.handler) return;
      file.handler.cancelUpload();
      setStateUpdate((stateUpdate) => stateUpdate + 1);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      isDragOver.setTrue();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      isDragOver.setFalse();
    };

    const handleUpload = (files: File[]) => {
      const { filesWithErrors, filesToUpload } = filterFilesToUpload({
        files,
        supportedExtensions,
        supportedMimeTypes,
        fileMaxSize,
        maxUploadFiles: !allowMultiple ? 1 : maxUploadFiles,
      });

      if (filesWithErrors.length === 1) {
        toastError(filesWithErrors[0].error || "This file is not supported");
      } else if (filesWithErrors.length > 1) {
        toastError(
          `These files are not supported: ${filesWithErrors
            .map((file) => `${file.name} (${file.errorType})`)
            .join(", ")}`,
        );
      }

      startUploads(filesToUpload);
      isDragOver.setFalse();
    };

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      handleUpload(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      //isDragOver.setFalse();

      handleUpload(Array.from(e.dataTransfer.files));
    };

    if (
      isOpen !== true &&
      !isDragDetected &&
      !isDragOver.value &&
      !filesToUpload.current.length
    )
      return null;

    return (
      <>
        <Flex
          data-drag-over={booleanDataAttr(isDragOver.value)}
          ref={ref}
          className={[
            classes.DropZone,
            isDragOver.value && classes.DropZoneDragOver,
          ]}
        >
          <Flex className={[classes.Content, isDragOver.value && "scale-125"]}>
            {getMdiIcon("cloudUpload", { size: 2 })}
            <Box>Drag and drop files here</Box>
            <Box className={classes.UploadInfo}></Box>
            <Flex className={"gap-2 mt-4"}>
              <Button className={"relative"}>
                Select files{" "}
                <input
                  className={classes.SelectFileButton}
                  type={"file"}
                  accept={supportedMimeTypes?.join(",")}
                  multiple={allowMultiple}
                  onChange={handleSelectFiles}
                />
              </Button>
              <Button variant={"outline"} onClick={() => onOpenChange?.(false)}>
                Cancel
              </Button>
            </Flex>
          </Flex>

          {!!filesToUpload.current.length && (
            <Flex className={"gap-2 p-6 flex-col max-w-full overflow-auto"}>
              {filesToUpload.current
                .filter((file) => !file.isCanceled)
                .reverse()
                .map((file, fileIndex) => (
                  <DropZoneUploadItem
                    key={fileIndex}
                    file={file}
                    fileIndex={fileIndex}
                    abortUpload={abortUpload}
                  />
                ))}
            </Flex>
          )}
          {(isDragDetected || isDragOver.value) && (
            <Box
              className={classes.DropZoneReceiver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          )}
        </Flex>
      </>
    );
  },
);

DropZone.displayName = "DropZone";

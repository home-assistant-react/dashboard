import { useApi } from "@home-assistant-react/api/src";
import {
  useBooleanValue,
  useDisclosure,
} from "@home-assistant-react/hooks/src";
import { useStandardApiHandler } from "@home-assistant-react/hooks/src/useStandardApiHandler";
import {
  Box,
  Button,
  DeleteConfirmModal,
  Flex,
  Switch,
} from "@home-assistant-react/ui/src";
import { Heading } from "@home-assistant-react/ui/src/components/data-display/Heading";
import { Icon } from "@home-assistant-react/ui/src/primitives/Icon";
import React from "react";

export const ImportExportSettings: React.FC = () => {
  const api = useApi();
  const confirmUploadFullBackupDisclosure = useDisclosure<{ file: File }>();

  const {
    wrapApiRequest: wrapFullBackupRequest,
    isLoading: isDownloadLoading,
  } = useStandardApiHandler();
  const {
    wrapApiRequest: wrapFullRestoreRequest,
    isLoading: isRestoreLoading,
  } = useStandardApiHandler();

  const handleFullBackupExport = wrapFullBackupRequest(async () => {
    await api.downloadFullBackup();
  });

  const eraseAllData = useBooleanValue();

  const handleFullBackupImport = wrapFullRestoreRequest(async (file: File) => {
    await api.uploadFullBackup(file);
    window.location.reload();
  });

  const isDisabled = isDownloadLoading || isRestoreLoading;

  return (
    <Flex className={"gap-10 flex-col px-10"}>
      <Flex className={"flex-col gap-2"}>
        <Heading as={"h6"}>Export a full backup of the module</Heading>
        <Box>
          <Button
            isLoading={isDownloadLoading}
            isDisabled={!isDownloadLoading && isDisabled}
            onClick={handleFullBackupExport}
            icon={"Download"}
          >
            Export full backup
          </Button>
        </Box>
      </Flex>
      <Flex className={"flex-col gap-2"}>
        <Heading as={"h6"}>Restore a full backup</Heading>
        <Box>
          <Button
            isLoading={isRestoreLoading}
            isDisabled={!isRestoreLoading && isDisabled}
            icon={"ArchiveRestore"}
            className={"relative"}
            onClick={(e) => e.currentTarget?.querySelector("input")?.click()}
          >
            <input
              type="file"
              className={
                "hidden absolute inset-0 cursor-pointer hover:cursor-pointer"
              }
              accept={"application/zip"}
              onChange={async (e) => {
                const file = (e.target as HTMLInputElement).files![0];
                if (!file) return;
                confirmUploadFullBackupDisclosure.onOpenChange(true, {
                  file,
                });
                e.currentTarget.value = "";
              }}
            />
            Restore full backup
          </Button>
        </Box>
      </Flex>
      <DeleteConfirmModal
        isOpen={confirmUploadFullBackupDisclosure.isOpen}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            return;
          }
          confirmUploadFullBackupDisclosure.onOpenChange(isOpen);
        }}
        title={"Restore full backup"}
        message={
          <Flex className={"flex-col w-full gap-4"}>
            Are you sure you want to restore this full backup?
            <label
              className={"flex items-center gap-2 cursor-pointer select-none"}
            >
              <Switch
                checked={eraseAllData.value}
                onCheckedChange={eraseAllData.setValue}
                id={"restore-full-backup-clear-all-data"}
              />
              <label htmlFor={"restore-full-backup-clear-all-data"}>
                Erase all existing data
              </label>
            </label>
            <Flex
              className={
                "mt-6 text-semantic-error-foreground items-center gap-4"
              }
            >
              <Icon name={"TriangleAlert"} />
              <Box>
                All the{" "}
                {eraseAllData.value ? (
                  <strong>EXISTING DATA</strong>
                ) : (
                  <strong>MATCHING DATA</strong>
                )}{" "}
                will be erased and replaced with the data from the backup.
              </Box>
            </Flex>
          </Flex>
        }
        onConfirm={async () => {
          if (confirmUploadFullBackupDisclosure.data?.file)
            await handleFullBackupImport(
              confirmUploadFullBackupDisclosure.data.file,
            );
          confirmUploadFullBackupDisclosure.onOpenChange(false);
        }}
        confirmLabel={
          eraseAllData.value
            ? "Erase data and restore full backup"
            : "Restore full backup"
        }
        confirmText={"RESTORE ALL DATA"}
      />
    </Flex>
  );
};

import { createBackupFile, restoreBackup } from "../helpers/backup";

const getBackup = async (directories: string[]) => {
  return await createBackupFile(directories, "full");
};

const restoreFullBackup = async (zipFile: Buffer, eraseOldData: boolean) => {
  if (eraseOldData) {
    console.log("ERASE");
  }

  await restoreBackup(zipFile, false);
};

export const ImportExportServices = {
  getBackup,
  restoreFullBackup,
};

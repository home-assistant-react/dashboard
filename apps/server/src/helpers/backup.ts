import { DATA_PATH } from "../const";
import { extractZip, zipFoldersToBlob } from "./zip";

export const createBackupFile = async (directories: string[], type: string) => {
  const packageJson = require("../../../../package.json");
  const version = packageJson.version;
  return await zipFoldersToBlob(directories, version, type);
};

export const restoreBackup = async (zipFile: Buffer, eraseOldData: boolean) => {
  if (eraseOldData) {
    console.log("ERASE");
  }
  extractZip(zipFile, DATA_PATH);
};

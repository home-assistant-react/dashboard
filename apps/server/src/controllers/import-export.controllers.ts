import fileUpload from "express-fileupload";
import moment from "moment";
import { FULL_BACKUP_DIRECTORIES } from "../const";
import {
  errBackupRestoreFailed,
  errExportFailed,
  errNoRestoreBackupFile,
} from "@home-assistant-react/types/src/api/errors";
import { buildApiError } from "../helpers/buildApiError";
import { defineController } from "../helpers/defineController";
import { ImportExportServices } from "../services/import-export.services";

const exportAll = defineController(async ({ response }) => {
  try {
    const zip = await ImportExportServices.getBackup(FULL_BACKUP_DIRECTORIES);

    console.log("THE BLOB", zip.blob);

    response?.setHeader("Content-Length", zip.blob.size.toString());
    response?.setHeader("Content-Type", "application/zip");
    response?.setHeader(
      "Content-Disposition",
      `attachment; filename="backup-${moment().format("YYYY-MM-DD-HH-mm-ss")}.zip"`,
    );
    const buffer = await zip.blob.arrayBuffer();
    response?.send(Buffer.from(buffer));
    //response?.end();
  } catch (error) {
    throw buildApiError(
      "fef42d09-d63d-480a-8651-7c5a5705fa91",
      errExportFailed,
      {
        errors: error,
      },
    );
  }
});

const importAll = defineController(async ({ request }) => {
  try {
    const file = request?.files?.backup_file as fileUpload.UploadedFile;

    if (!file) {
      throw buildApiError(
        "c4ee63fe-a7ab-4955-9d07-e133cb626316",
        errNoRestoreBackupFile,
      );
    }

    const buffer = file.data;
    const eraseOldData = request?.params?.eraseOldData === "true";

    await ImportExportServices.restoreFullBackup(buffer, eraseOldData);

    return { success: true };
  } catch (err) {
    throw buildApiError(
      "a6df30af-0f82-47db-9fbb-be572449f976",
      errBackupRestoreFailed,
      {
        errors: err,
      },
    );
  }
});

export const ImportExportControllers = {
  exportAll,
  importAll,
};

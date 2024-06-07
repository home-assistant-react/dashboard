import { UploadFile } from "@home-assistant-react/types/src";
import { bytesToHumanReadableSize } from "@home-assistant-react/helpers/src/numbers/bytesToHumanReadableSize";

interface FilterFilesToUploadOptions {
  files: File[];
  supportedMimeTypes?: string[];
  supportedExtensions?: string[];
  fileMaxSize?: number;
  maxUploadFiles?: number;
}
export function filterFilesToUpload({
  files,
  supportedMimeTypes,
  supportedExtensions,
  fileMaxSize,
  maxUploadFiles,
}: FilterFilesToUploadOptions) {
  let filesToUpload: UploadFile[] = [];
  let sizeErrorsCount = 0;
  let extensionErrorsCount = 0;
  let mimeTypeErrorsCount = 0;
  const filesWithErrors: UploadFile[] = [];

  for (let i = 0; i < files.length; i++) {
    const file: UploadFile = {
      file: files[i],
      name: files[i].name,
      type: files[i].type,
      extension: files[i].name?.split(".")?.pop(),
    };
    if (fileMaxSize && files[i].size > fileMaxSize) {
      file.errorType = "size";
      file.error = `Too big to upload (${bytesToHumanReadableSize(
        files[i].size,
      )}), max size is ${bytesToHumanReadableSize(fileMaxSize)}`;
      filesWithErrors.push(file);
      sizeErrorsCount++;
    } else {
      filesToUpload.push(file);
    }
  }

  if (
    (Array.isArray(supportedExtensions) && supportedExtensions.length > 0) ||
    (Array.isArray(supportedMimeTypes) && supportedMimeTypes.length > 0)
  ) {
    filesToUpload = filesToUpload.filter((file) => {
      if (
        Array.isArray(supportedExtensions) &&
        supportedExtensions.length > 0 &&
        (!file.extension || !supportedExtensions.includes(file.extension))
      ) {
        file.errorType = "extension";
        file.error = `Unsupported file extension: ${file.extension}`;
        filesWithErrors.push(file);
        extensionErrorsCount++;
        return false;
      }

      if (
        Array.isArray(supportedMimeTypes) &&
        supportedMimeTypes.length > 0 &&
        (!file.type || !supportedMimeTypes.includes(file.type!))
      ) {
        file.errorType = "mime-type";
        file.error = `Unsupported file type: ${file.type}`;
        filesWithErrors.push(file);
        mimeTypeErrorsCount++;
        return false;
      }

      return true;
    });

    if (maxUploadFiles && filesToUpload.length > maxUploadFiles) {
      filesToUpload = filesToUpload.slice(0, maxUploadFiles);
    }
  }

  return {
    filesToUpload,
    filesWithErrors,
    sizeErrorsCount,
    extensionErrorsCount,
    mimeTypeErrorsCount,
  };
}

export function isFileWaitingForUpload(file: UploadFile) {
  return (
    !file.isUploading && !file.isUploaded && !file.errorType && !file.isCanceled
  );
}

export function isFileUploading(file: UploadFile) {
  return (
    file.isUploading && !file.isUploaded && !file.errorType && !file.isCanceled
  );
}

export function uploadFileHasError(file: UploadFile) {
  return !!file.errorType;
}

export function isUploadFileSuccess(file: UploadFile) {
  return file.isUploaded && !file.isCanceled && !file.errorType;
}

export function isUploadFileCompleted(file: UploadFile) {
  return file.isUploaded || file.isCanceled || !!file.errorType;
}

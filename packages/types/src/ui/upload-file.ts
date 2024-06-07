import { FileUploader } from "@home-assistant-react/api/src/helpers/file-uploader";

export interface UploadFile {
  file?: File;
  name?: string;
  type?: string;
  extension?: string;
  isUploading?: boolean;
  isUploaded?: boolean;
  isCanceled?: boolean;
  progress?: number;
  error?: string;
  errorType?: "extension" | "mime-type" | "size" | "unknown";
  handler?: FileUploader;
}

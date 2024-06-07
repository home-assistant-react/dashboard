import {
  FileUploader,
  FileUploaderOptions,
} from "@home-assistant-react/api/src/helpers/file-uploader";
import { UploadFile } from "@home-assistant-react/types/src";

export interface DropZoneProps {
  supportedMimeTypes?: string[];
  supportedExtensions?: string[];
  fileMaxSize?: number;
  simultaneousUploads?: number;
  fileUploaderGetter: (options?: FileUploaderOptions) => Promise<FileUploader>;
  closeOnFinish?: boolean;
  onFinish?: (uploadedFiles: UploadFile[]) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  allowMultiple?: boolean;
  maxUploadFiles?: number;
  onErrors?: (errors: string[]) => void;
}

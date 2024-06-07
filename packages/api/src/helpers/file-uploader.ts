import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { AxiosInstance, CancelTokenSource } from "axios";
import { Dict } from "@home-assistant-react/types/src";
import { getObjectKeys } from "@home-assistant-react/helpers/src";

export interface UploadProgressData {
  percentage: number;
  bytesUploaded: number;
  totalBytes: number;
}

export interface FileUploaderOptions {
  onUploadProgress?: (progressData: UploadProgressData) => void;
  onError?: (error: unknown) => void;
  onSuccess?: (response: unknown) => void;
  onCancel?: () => void;
  fileFieldName?: string;
  data?: Dict;
}

export class FileUploader {
  public bytesUploaded: number = 0;
  public totalBytes: number = 0;
  public percentage: number = 0;
  private cancelToken?: CancelTokenSource;
  constructor(
    public handler: AxiosInstance,
    public url: string,
    public options?: FileUploaderOptions,
  ) {}

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append(this.options?.fileFieldName || "file", file);
    if (this.options?.data) {
      getObjectKeys(this.options.data).forEach((key) => {
        formData.append(String(key), this.options?.data?.[key]);
      });
    }

    // Create a new cancel token
    this.cancelToken = axios.CancelToken.source();

    const config: AxiosRequestConfig = {
      onUploadProgress: (event: AxiosProgressEvent) => {
        this.percentage = Math.round((event.loaded * 100) / (event.total || 0));
        this.bytesUploaded = event.loaded;
        this.totalBytes = event.total || 0;
        const progressData: UploadProgressData = {
          percentage: this.percentage,
          bytesUploaded: this.bytesUploaded,
          totalBytes: this.totalBytes,
        };

        this.options?.onUploadProgress?.(progressData);
      },
      cancelToken: this.cancelToken.token,
    };

    this.handler
      .post(this.url, formData, config)
      .then((response) => {
        this.options?.onSuccess?.(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          this.options?.onCancel?.();
        } else {
          if (error.response?.data) {
            return this.options?.onError?.(error.response?.data);
          }

          this.options?.onError?.("Unknown error");
        }
      });
  }

  cancelUpload(): void {
    if (this.cancelToken) {
      this.cancelToken.cancel("User cancelled the upload.");
    }
  }
}

import { Dict } from "@home-assistant-react/types/src/common";

export interface ErrorDetails {
  title: string;
  status: number;
  code: string;
}

export interface BaseErrorOptions {
  id: string;
  title: string;
  detail: string;
  status?: number;
  code?: string;
  errors?: any;
  meta?: Dict;
  isPublic?: boolean;
  stack?: string;
}

export class BaseError extends Error {
  id: string;
  title: string;
  detail: string;
  status?: number;
  code?: string;
  errors?: any;
  meta?: Dict;
  isPublic?: boolean;

  constructor(options: BaseErrorOptions) {
    super(options.detail);
    this.id = options.id;
    this.title = options.title;
    this.detail = options.detail;
    this.status = options.status;
    this.code = options.code;
    this.errors = options.errors;
    this.meta = options.meta;
    this.isPublic = options.isPublic;
    this.stack = options.stack;
  }
}

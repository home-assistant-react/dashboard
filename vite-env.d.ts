/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DASHBOARD_VERSION: string;
  readonly DASHBOARD_PROJECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ADVISOR_NAME?: string;
  readonly VITE_ADVISOR_PHONE_1?: string;
  readonly VITE_ADVISOR_PHONE_2?: string;
  readonly VITE_ADVISOR_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

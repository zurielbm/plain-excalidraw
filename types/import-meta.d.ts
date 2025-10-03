interface ImportMetaEnv {
  readonly PKG_NAME?: string;
  readonly PKG_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
    ClipboardItem: any;
    __EXCALIDRAW_SHA__: string | undefined;
    EXCALIDRAW_ASSET_PATH: string | string[] | undefined;
    EXCALIDRAW_THROTTLE_RENDER: boolean | undefined;
    DEBUG_FRACTIONAL_INDICES: boolean | undefined;
    EXCALIDRAW_EXPORT_SOURCE: string;
    gtag: Function;
    sa_event: Function;
    fathom: { trackEvent: Function };
  }
  
  declare module "*.scss";
  declare module "*.css";
  declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }
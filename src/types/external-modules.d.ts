declare module "png-chunk-text" {
  export interface PngTextChunk {
    name: string;
    data: Uint8Array;
  }

  const tEXt: {
    encode(keyword: string, text: string): PngTextChunk;
    decode(data: Uint8Array): { keyword: string; text: string };
  };

  export default tEXt;
}

declare module "png-chunks-encode" {
  import type { PngTextChunk } from "png-chunk-text";

  type PngChunk = PngTextChunk | { name: string; data: Uint8Array };

  export default function encodePng(chunks: readonly PngChunk[]): Uint8Array;
}

declare module "png-chunks-extract" {
  export interface PngChunk {
    name: string;
    data: Uint8Array;
  }

  export default function decodePng(data: Uint8Array): PngChunk[];
}

declare module "image-blob-reduce" {
  export interface ImageBlobReduceEnv {
    out_canvas: HTMLCanvasElement;
    out_blob?: Blob;
  }

  export interface ImageBlobReduceOptions {
    pica?: any;
  }

  export interface ImageBlobReduceInstance {
    toBlob(
      file: Blob | File,
      options: { max?: number; alpha?: boolean },
    ): Promise<Blob>;
    pica: {
      toBlob(
        canvas: HTMLCanvasElement,
        type?: string,
        quality?: number,
      ): Promise<Blob>;
    } & Record<string, any>;
    _create_blob?: (
      env: ImageBlobReduceEnv,
    ) => Promise<ImageBlobReduceEnv> | ImageBlobReduceEnv;
  }

  export default function imageBlobReduce(
    options?: ImageBlobReduceOptions,
  ): ImageBlobReduceInstance;
}

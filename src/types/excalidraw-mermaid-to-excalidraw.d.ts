declare module "@excalidraw/mermaid-to-excalidraw/dist/interfaces" {
  import type { ExcalidrawElementSkeleton } from "../lib/data/transform";
  import type { BinaryFiles } from "../lib/types";

  export interface MermaidToExcalidrawResult {
    elements: ExcalidrawElementSkeleton[];
    files: BinaryFiles | null;
  }
}

declare module "@excalidraw/mermaid-to-excalidraw" {
  import type { MermaidToExcalidrawResult } from "@excalidraw/mermaid-to-excalidraw/dist/interfaces";

  export type MermaidConfig = Record<string, unknown>;

  export function parseMermaidToExcalidraw(
    definition: string,
    config?: MermaidConfig
  ): Promise<MermaidToExcalidrawResult>;
}

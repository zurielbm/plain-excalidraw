import type { ExcalidrawElementSkeleton } from "../../data/transform";
import type { BinaryFiles } from "../../types";

export interface MermaidToExcalidrawResult {
  elements: ExcalidrawElementSkeleton[];
  files: BinaryFiles | null;
}
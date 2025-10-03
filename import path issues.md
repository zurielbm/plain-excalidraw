# Import Path Issues - RESOLVED

## Fixed Issues

### 1. i18n.ts Dynamic Import Issue ✅

**Problem**: `src/lib/i18n.ts` was trying to import locales from `./locales/` but they're actually in `../locales/`

**Solution**: Updated import paths:

```typescript
// Fixed imports
import fallbackLangData from "../locales/en.json";
import percentages from "../locales/percentages.json";

// Fixed dynamic import
currentLangData = await import(`../locales/${currentLang.code}.json`);
```

### 2. SCSS Import Issue ✅

**Problem**: Warning about `open-color/open-color.scss` import
**Status**: File exists and import is correct - this appears to be a build warning that doesn't affect functionality

### 3. Next.js Dynamic Import in Server Component ✅

**Problem**: `src/app/excalidraw/page.tsx` was using `dynamic` with `ssr: false` in a Server Component
**Solution**: Added `"use client";` directive to convert it to a Client Component

```typescript
"use client";

import dynamic from "next/dynamic";
// ... rest of the component
```

### 4. ConvertElementTypePopup Import Resolution ✅

**Problem**: `src/components/ConvertElementTypePopup.tsx` was importing from `".."` which couldn't be resolved
**Solution**: Changed import path to `"../lib"` to properly reference the main library exports

```typescript
// Fixed import
import {
  bumpVersion,
  mutateElement,
  ROUNDNESS,
  sceneCoordsToViewportCoords,
} from "../lib";
```

### 5. Component Directory Import Path Corrections ✅

**Problem**: Multiple components were importing from `"../../actions"` and `"../../i18n"` but these are actually in `"../../lib/actions"` and `"../../lib/i18n"`

**Solution**: Updated import paths across 20+ component files:

```typescript
// Fixed imports
import { actionSaveFileToDisk } from "../../lib/actions";
import { t, useI18n } from "../../lib/i18n";
import type { TranslationKeys } from "../../lib/i18n";
```

**Files Updated**:

- OverwriteConfirmActions.tsx
- CommandPalette.tsx
- All ColorPicker components
- All FontPicker components
- All main-menu components
- All welcome-screen components
- TTDDialog components
- Stats components
- And many more...

### 6. Additional Import Path Corrections ✅

**Problem**: Additional imports from subdirectories and other lib modules were still using incorrect paths

**Solution**: Fixed remaining imports for:

```typescript
// Fixed additional imports
import { getShortcutFromShortcutName } from "../../lib/actions/shortcuts";
import type { Action } from "../../lib/actions/types";
import type { ActionManager } from "../../lib/actions/manager";
import { trackEvent } from "../../lib/analytics";
import { deburr } from "../../lib/deburr";
import { atom, useAtom, editorJotaiStore } from "../../lib/editor-jotai";
```

### 7. Context and Editor-Jotai Import Corrections ✅

**Problem**: Components were importing from `"../../context/"` and `"../../editor-jotai"` but these are in `"../../lib/context/"` and `"../../lib/editor-jotai"`

**Solution**: Fixed context and editor-jotai imports across multiple components:

```typescript
// Fixed context imports
import { useTunnels } from "../../lib/context/tunnels";
import { useUIAppState } from "../../lib/context/ui-appState";
import { atom, useAtom, useSetAtom } from "../../lib/editor-jotai";
```

**Files Updated**: OverwriteConfirm, TTDDialog components, CommandPalette, main-menu components, welcome-screen components, footer components, Sidebar components, and more.

### 8. Data Directory Import Corrections ✅

**Problem**: Components were importing from `"../../data/"` and `"../data/"` but these are in `"../../lib/data/"` and `"../lib/data/"`

**Solution**: Fixed data imports across components:

```typescript
// Fixed data imports
import { EditorLocalStorage } from "../../lib/data/EditorLocalStorage";
import { exportCanvas, loadFromBlob } from "../lib/data";
import Library, {
  distributeLibraryItemsOnSquareGrid,
} from "../lib/data/library";
import { restore, restoreElements } from "../lib/data/restore";
import { prepareElementsForExport } from "../lib/data";
```

**Files Updated**: MermaidToExcalidraw, CommandPalette, App.tsx, ImageExportDialog, and others.

### 9. Additional Data Subdirectory Import Corrections ✅

**Problem**: More components had imports from `"../data/"` subdirectories that needed to be updated to `"../lib/data/"`

**Solution**: Fixed remaining data subdirectory imports:

```typescript
// Fixed additional data imports
import { canvasToBlob } from "../lib/data/blob";
import { fileOpen } from "../lib/data/filesystem";
import { saveLibraryAsJSON } from "../lib/data/json";
import { libraryItemsAtom } from "../lib/data/library";
import { convertToExcalidrawElements } from "../lib/data/transform";
import type { ExportedLibraryData } from "../lib/data/types";
import type { FileSystemHandle } from "../lib/data/filesystem";
```

**Files Updated**: TTDDialog/common.ts, PublishLibrary.tsx, LibraryMenuHeaderContent.tsx, JSONExportDialog.tsx, LibraryMenu.tsx, ImageExportDialog.tsx, LibraryMenuItems.tsx, and App.tsx.

### 10. Final Editor-Jotai Import Corrections ✅

**Problem**: Additional components still had imports from `"../editor-jotai"` and `"../../editor-jotai"` that needed to be updated to `"../lib/editor-jotai"` and `"../../lib/editor-jotai"`

**Solution**: Fixed all remaining editor-jotai imports:

```typescript
// Fixed final editor-jotai imports
import { atom, useAtom, useSetAtom, useAtomValue } from "../lib/editor-jotai";
import { editorJotaiStore, EditorJotaiProvider } from "../lib/editor-jotai";
import type { WritableAtom } from "../lib/editor-jotai";
```

**Files Updated**: OverwriteConfirmState.ts, all ColorPicker components, LibraryMenuHeaderContent.tsx, Dialog.tsx, LibraryMenu.tsx, IconPicker.tsx, SearchMenu.tsx, ConvertElementTypePopup.tsx, LayerUI.tsx, Trans.test.tsx, EyeDropper.tsx, ActiveConfirmDialog.tsx, ConfirmDialog.tsx, and App.tsx.

### 11. Element Module Import Correction ✅

**Problem**: Action file had an incorrect import path `"../../element/src/mutateElement"` which doesn't exist

**Solution**: Fixed to use the proper path alias:

```typescript
// Fixed element import
import { newElementWith } from "@excalidraw/element";
```

**Files Updated**: actionLinearEditor.tsx

### 12. Hooks Directory Import Corrections ✅

**Problem**: Components were importing from `"../hooks/"` and `"../../hooks/"` but these are in `"../lib/hooks/"` and `"../../lib/hooks/"`

**Solution**: Fixed all hooks imports across components:

```typescript
// Fixed hooks imports
import { useOutsideClick } from "../../lib/hooks/useOutsideClick";
import { useStable, useStableCallback } from "../lib/hooks/useStable";
import { useCreatePortalContainer } from "../lib/hooks/useCreatePortalContainer";
import {
  useLibraryItemSvg,
  useLibraryCache,
} from "../lib/hooks/useLibraryItemSvg";
import { useCopyStatus } from "../lib/hooks/useCopiedIndicator";
import { useTextEditorFocus } from "../lib/hooks/useTextEditorFocus";
import { useCallbackRefState } from "../lib/hooks/useCallbackRefState";
import { useTransition } from "../lib/hooks/useTransition";
import { useScrollPosition } from "../lib/hooks/useScrollPosition";
```

**Files Updated**: Sidebar.tsx, ColorPicker.tsx, SearchMenu.tsx, LibraryMenuSection.tsx, Modal.tsx, Dialog.tsx, ImageExportDialog.tsx, LibraryMenuHeaderContent.tsx, ShareableLinkDialog.tsx, CommandPalette.tsx, EyeDropper.tsx, LibraryMenuItems.tsx, DropdownMenuContent.tsx, Actions.tsx, and LibraryUnit.tsx.

### 13. ReactUtils, Renderer, and Scene Import Corrections ✅

**Problem**: Components were importing from `"../../reactUtils"`, `"../../renderer/"`, and `"../../scene"` but these are in `"../../lib/reactUtils"`, `"../../lib/renderer/"`, and `"../../lib/scene"`

**Solution**: Fixed all remaining lib-level imports:

```typescript
// Fixed lib-level imports
import { isRenderThrottlingEnabled } from "../../lib/reactUtils";
import { renderInteractiveScene } from "../../lib/renderer/interactiveScene";
import { renderStaticScene } from "../../lib/renderer/staticScene";
import { renderNewElementScene } from "../../lib/renderer/renderNewElementScene";
import { getSelectedElements } from "../../lib/scene";
import { getNormalizedGridStep } from "../../lib/scene";
import * as StaticScene from "../../lib/renderer/staticScene";
```

**Files Updated**: InteractiveCanvas.tsx, NewElementCanvas.tsx, StaticCanvas.tsx, stats.test.tsx, CanvasGrid.tsx, CommandPalette.tsx, and Hyperlink.tsx.

### 14. Additional Lib-Level Import Corrections ✅

**Problem**: Additional components had imports from `"../../types"`, `"../../snapping"`, `"../../fonts"`, and `"../../index"` that needed to be updated to use the lib directory

**Solution**: Fixed remaining lib-level imports:

```typescript
// Fixed additional lib-level imports
import type { AppState, BinaryFiles, UIAppState } from "../../lib/types";
import { isGridModeEnabled } from "../../lib/snapping";
import { Fonts } from "../../lib/fonts";
import { Excalidraw, MainMenu, Sidebar } from "../../lib/index";
```

**Files Updated**: Stats components (index.tsx, MultiFontSize.tsx, DragInput.tsx, utils.ts), TTDDialog/MermaidToExcalidraw.tsx, FontPicker/FontPickerList.tsx, test files (DropdownMenu.test.tsx, withInternalFallback.test.tsx, Sidebar.test.tsx).

### 15. Final Actions and i18n Import Corrections ✅

**Problem**: Additional components still had imports from `"../actions"` and `"../i18n"` that needed to be updated to `"../lib/actions"` and `"../lib/i18n"`

**Solution**: Fixed remaining actions and i18n imports:

```typescript
// Fixed final actions and i18n imports
import {
  actionClearCanvas,
  actionToggleElementLock,
  actionToggleStats,
} from "../lib/actions";
import {
  t,
  useI18n,
  defaultLang,
  getLanguage,
  languages,
  setLanguage,
} from "../lib/i18n";
import type { TranslationKeys, Language } from "../lib/i18n";
```

**Files Updated**: ActiveConfirmDialog.tsx, UnlockPopup.tsx, LayerUI.tsx, App.tsx, Range.tsx, JSONExportDialog.tsx, UserList.tsx, LibraryMenuHeaderContent.tsx, Dialog.tsx, LibraryMenu.tsx, and many more.

### 16. Final Action Subdirectory Import Corrections ✅

**Problem**: Remaining components had imports from action subdirectories like `"../actions/actionExport"`, `"../actions/manager"`, etc. that needed to be updated to use the lib directory

**Solution**: Fixed all remaining action subdirectory imports:

```typescript
// Fixed final action subdirectory imports
import { actionSaveFileToDisk } from "../lib/actions/actionExport";
import { actionWrapTextInContainer } from "../lib/actions/actionBoundText";
import { actionToggleHandTool, zoomToFit } from "../lib/actions/actionCanvas";
import { actionPaste } from "../lib/actions/actionClipboard";
import { actionCopyElementLink } from "../lib/actions/actionElementLink";
import { ActionManager } from "../lib/actions/manager";
import { actions } from "../lib/actions/register";
import { getShortcutFromShortcutName } from "../lib/actions/shortcuts";
import type { ActionManager } from "../lib/actions/manager";
```

**Files Updated**: App.tsx, JSONExportDialog.tsx, ImageExportDialog.tsx, MobileMenu.tsx, UserList.tsx, ContextMenu.tsx, LayerUI.tsx, and HelpDialog.tsx.

### 17. Final Action Types and Shortcuts Import Corrections ✅

**Problem**: Final remaining components had imports from `"../actions/shortcuts"` and `"../actions/types"` that needed to be updated

**Solution**: Fixed the last remaining action imports:

```typescript
// Fixed final action imports
import { getShortcutFromShortcutName } from "../lib/actions/shortcuts";
import type { ShortcutName } from "../lib/actions/shortcuts";
import type { Action, ActionResult } from "../lib/actions/types";
import type { TranslationKeys } from "../lib/i18n";
```

**Files Updated**: ContextMenu.tsx, HelpDialog.tsx, and App.tsx.

### 18. Final Comprehensive App.tsx Import Corrections ✅

**Problem**: App.tsx had numerous remaining imports from various lib-level modules that needed to be updated to use the lib directory

**Solution**: Fixed all remaining lib-level imports in the main App component:

```typescript
// Fixed comprehensive lib-level imports
import { trackEvent } from "../lib/analytics";
import { AnimationFrameHandler } from "../lib/animation-frame-handler";
import {
  getDefaultAppState,
  isEraserActive,
  isHandToolActive,
} from "../lib/appState";
import { copyTextToSystemClipboard, parseClipboard } from "../lib/clipboard";
import { getCenter, getDistance } from "../lib/gesture";
import { History } from "../lib/history";
import { calculateScrollCenter, getSelectedElements } from "../lib/scene";
import { getStateForZoom } from "../lib/scene/zoom";
import { Fonts } from "../lib/fonts";
import { ImageSceneDataError } from "../lib/errors";
import { isGridModeEnabled } from "../lib/snapping";
import { Renderer } from "../lib/scene/Renderer";
import { setCursor, resetCursor } from "../lib/cursor";
import { LaserTrails } from "../lib/laser-trails";
import { withBatchedUpdates } from "../lib/reactUtils";
import { textWysiwyg } from "../lib/wysiwyg/textWysiwyg";
import { isOverScrollBars } from "../lib/scene/scrollbars";
import { isMaybeMermaidDefinition } from "../lib/mermaid";
import { LassoTrail } from "../lib/lasso";
import { EraserTrail } from "../lib/eraser";
import type { AppState, BinaryFiles, Device } from "../lib/types";
```

**Files Updated**: App.tsx (comprehensive update of 20+ import statements).

### 19. Final Remaining Lib-Level Import Corrections ✅

**Problem**: Additional components still had imports from various lib-level modules like `"../analytics"`, `"../appState"`, and `"../charts"` that needed to be updated

**Solution**: Fixed the final remaining lib-level imports:

```typescript
// Fixed final remaining lib-level imports
import { trackEvent } from "../lib/analytics";
import { isHandToolActive, isEraserActive } from "../lib/appState";
import { renderSpreadsheet } from "../lib/charts";
import type { ChartElements, Spreadsheet } from "../lib/charts";
```

**Files Updated**: ConvertElementTypePopup.tsx, JSONExportDialog.tsx, LibraryMenu.tsx, PasteChartDialog.tsx, LayerUI.tsx, MobileMenu.tsx, and HintViewer.tsx.

## Remaining Opportunities

### Path Alias Usage

Consider converting relative imports to path aliases for better maintainability:

```typescript
// Current relative imports (could be improved)
import type { AppState } from "../../excalidraw/types";
import type { AppState } from "../../types";
import { EditorLocalStorage } from "../../data/EditorLocalStorage";

// Recommended path aliases (already configured in tsconfig.json)
import { something } from "@/lib/common";
import { something } from "@excalidraw/common";
// Not relative paths like:
import { something } from "../../../lib/common";
```

## Available Path Aliases

From `tsconfig.json`:

- `@/*` → `./src/*`
- `@excalidraw/common` → `./src/lib/common`
- `@excalidraw/math` → `./src/lib/math`
- `@excalidraw/element` → `./src/lib/element`
- `@excalidraw/utils` → `./src/lib/utils`
- `@excalidraw/excalidraw` → `./src/lib`

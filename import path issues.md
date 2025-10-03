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

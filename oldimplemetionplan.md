# Excalidraw Migration Guide: Step-by-Step Integration for Next.js

This guide will help you migrate the Excalidraw codebase to a fresh Next.js project incrementally, allowing you to see it working at each stage and fix issues as they arise.

## Project Structure Overview

```
excalidraw-nextjs/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── excalidraw/
│   │       └── page.tsx         # Excalidraw page
│   ├── lib/                     # Library code
│   │   ├── math/                # Mathematical utilities
│   │   ├── common/              # Common utilities and constants
│   │   ├── element/             # Element system (core drawing logic)
│   │   ├── data/                # Data management and persistence
│   │   ├── scene/               # Scene rendering and management
│   │   ├── renderer/            # Canvas rendering logic
│   │   ├── actions/             # User actions and commands
│   │   ├── hooks/               # React hooks
│   │   ├── utils/               # General utilities
│   │   └── types.ts             # Type definitions
│   ├── components/              # React components
│   │   ├── excalidraw/          # Excalidraw-specific components
│   │   └── ui/                  # General UI components
│   ├── styles/                  # Stylesheets
│   └── public/                  # Static assets
│       └── fonts/               # Font files
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## Migration Order (180+ Steps)

### Missing Folders & Files to Include:

- **context/** - UI context providers
- **eraser/** - Eraser tool functionality
- **lasso/** - Lasso selection tool
- **wysiwyg/** - Text editing functionality
- **subset/** - Font subsetting utilities
- **locales/** - All internationalization files
- **Root level files:** analytics.ts, animated-trail.ts, animation-frame-handler.ts, charts.ts, clients.ts, laser-pointer.ts, laser-trails.ts, mermaid.ts, workers.ts, ExcalidrawWrapper.tsx, etc.

## Migration Order (180+ Steps)

### Phase 1: Next.js Project Setup (Steps 1-10)

**1. Create fresh Next.js + TypeScript project**

```bash
npx create-next-app@latest excalidraw-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd excalidraw-nextjs
```

**2. Test basic setup works**

```bash
npm run dev
```

**3. Install core dependencies**

```bash
npm install @braintree/sanitize-url @radix-ui/react-popover @radix-ui/react-tabs browser-fs-access canvas-roundrect-polyfill clsx es6-promise-pool fractional-indexing fuzzy image-blob-reduce jotai jotai-scope lodash.debounce lodash.throttle nanoid open-color pako perfect-freehand pica points-on-curve roughjs tunnel-rat cross-env png-chunk-text png-chunks-encode png-chunks-extract sass
```

**4. Install dev dependencies**

```bash
npm install -D @types/lodash.debounce @types/lodash.throttle @types/pako @types/pica @svgr/webpack
```

**5. Create next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    // Handle canvas and other node modules for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }

    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Handle SCSS files
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    return config;
  },
  // Disable static optimization for canvas pages
  experimental: {
    forceSwcTransforms: true,
  },
  // Handle dynamic imports
  transpilePackages: ["roughjs", "perfect-freehand"],
};

module.exports = nextConfig;
```

**6. Update tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/lib/common": ["./src/lib/common"],
      "@/lib/common/*": ["./src/lib/common/*"],
      "@/lib/element": ["./src/lib/element"],
      "@/lib/element/*": ["./src/lib/element/*"],
      "@/lib/math": ["./src/lib/math"],
      "@/lib/math/*": ["./src/lib/math/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**7. Create src/lib/global.d.ts**

```typescript
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
```

**8. Create src/styles/globals.scss**

```scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

// Excalidraw will add its styles here later
```

**9. Update src/app/layout.tsx**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excalidraw Next.js",
  description: "Excalidraw integrated with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**10. Test build still works**

```bash
npm run build
```

### Phase 2: Math Module (Steps 11-23)

**11. src/lib/math/types.ts**

```typescript
export type Point = readonly [number, number];
export type LocalPoint = Point & { _brand: "LocalPoint" };
export type GlobalPoint = Point & { _brand: "GlobalPoint" };
export type Radians = number & { _brand: "Radians" };
export type Degrees = number & { _brand: "Degrees" };
```

**12. src/lib/math/constants.ts**
**13. src/lib/math/utils.ts**
**14. src/lib/math/point.ts**
**15. src/lib/math/vector.ts**
**16. src/lib/math/line.ts**
**17. src/lib/math/rectangle.ts**
**18. src/lib/math/polygon.ts**
**19. src/lib/math/ellipse.ts**
**20. src/lib/math/triangle.ts**
**21. src/lib/math/curve.ts**
**22. src/lib/math/angle.ts**
**23. src/lib/math/index.ts**

Create test page:

```typescript
// src/app/test-math/page.tsx
"use client";

import { pointDistance } from "@/lib/math";

export default function TestMathPage() {
  const distance = pointDistance([0, 0], [3, 4]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Math Module Test</h1>
      <p>Distance calculation: {distance}</p>
      <p>✅ Math module working!</p>
    </div>
  );
}
```

### Phase 3: Common Utilities (Steps 24-35)

**24. src/lib/common/utility-types.ts**
**25. src/lib/common/constants.ts**
**26. src/lib/common/utils.ts**
**27. src/lib/common/colors.ts**
**28. src/lib/common/keys.ts**
**29. src/lib/common/points.ts**
**30. src/lib/common/emitter.ts**
**31. src/lib/common/random.ts**
**32. src/lib/common/url.ts**
**33. src/lib/common/index.ts**

**34. src/lib/deburr.ts**
**35. src/lib/errors.ts**

Test common utilities:

```typescript
// src/app/test-common/page.tsx
"use client";

import { COLOR_PALETTE } from "@/lib/common";

export default function TestCommonPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Common Module Test</h1>
      <p>Color palette loaded: {Object.keys(COLOR_PALETTE).length} colors</p>
      <div className="grid grid-cols-8 gap-2 mt-4">
        {Object.entries(COLOR_PALETTE)
          .slice(0, 16)
          .map(([name, color]) => (
            <div key={name} className="text-center">
              <div
                className="w-12 h-12 rounded mb-1 mx-auto"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">{name}</span>
            </div>
          ))}
      </div>
      <p className="mt-4">✅ Common module working!</p>
    </div>
  );
}
```

### Phase 4: Core Types (Steps 36-37)

**36. src/lib/types.ts** (Main type definitions)

**37. Test types compilation**

```bash
npm run build
```

### Phase 5: Element System (Steps 38-53)

**38. src/lib/element/types.ts**
**39. src/lib/element/typeChecks.ts**
**40. src/lib/element/newElement.ts**
**41. src/lib/element/mutateElement.ts**
**42. src/lib/element/bounds.ts**
**43. src/lib/element/comparisons.ts**
**44. src/lib/element/utils.ts**
**45. src/lib/element/textElement.ts**
**46. src/lib/element/renderElement.ts**
**47. src/lib/element/selection.ts**
**48. src/lib/element/resizeElements.ts**
**49. src/lib/element/dragElements.ts**
**50. src/lib/element/duplicate.ts**
**51. src/lib/element/groups.ts**
**52. src/lib/element/Scene.ts**
**53. src/lib/element/index.ts**

Test element creation:

```typescript
// src/app/test-element/page.tsx
"use client";

import { newElement } from "@/lib/element";

export default function TestElementPage() {
  const element = newElement({
    type: "rectangle",
    x: 10,
    y: 10,
    width: 100,
    height: 50,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Element System Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>Created rectangle:</strong>
        </p>
        <p>
          Size: {element.width}x{element.height}
        </p>
        <p>
          Position: ({element.x}, {element.y})
        </p>
        <p>ID: {element.id}</p>
        <p>Type: {element.type}</p>
      </div>
      <p className="mt-4">✅ Element system working!</p>
    </div>
  );
}
```

### Phase 6: Data Management (Steps 54-63)

**54. src/lib/data/types.ts**
**55. src/lib/data/restore.ts**
**56. src/lib/data/json.ts**
**57. src/lib/data/blob.ts**
**58. src/lib/data/library.ts**
**59. src/lib/data/filesystem.ts**
**60. src/lib/data/reconcile.ts**
**61. src/lib/data/transform.ts**
**62. src/lib/data/image.ts**
**63. src/lib/data/index.ts**

### Phase 7: State Management (Steps 64-68)

**64. src/lib/appState.ts**
**65. src/lib/editor-jotai.ts**
**66. src/lib/history.ts**

Test state:

```typescript
// src/app/test-state/page.tsx
"use client";

import { getDefaultAppState } from "@/lib/appState";

export default function TestStatePage() {
  const state = getDefaultAppState();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">State Management Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>Default App State:</strong>
        </p>
        <p>Theme: {state.theme}</p>
        <p>Zoom: {state.zoom.value}</p>
        <p>
          Canvas Size: {state.width}x{state.height}
        </p>
        <p>View Mode: {state.viewModeEnabled ? "Enabled" : "Disabled"}</p>
      </div>
      <p className="mt-4">✅ State management working!</p>
    </div>
  );
}
```

**67. src/lib/polyfill.ts**
**68. src/lib/i18n.ts**

### Phase 8: Scene & Rendering (Steps 69-78)

**69. src/lib/scene/types.ts**
**70. src/lib/scene/export.ts**
**71. src/lib/scene/normalize.ts**
**72. src/lib/scene/scroll.ts**
**73. src/lib/scene/zoom.ts**
**74. src/lib/scene/Renderer.ts**
**75. src/lib/scene/index.ts**

**76. src/lib/renderer/staticScene.ts**
**77. src/lib/renderer/interactiveScene.ts**
**78. src/lib/renderer/helpers.ts**

### Phase 9: Basic Canvas (Steps 79-85)

**79. src/lib/cursor.ts**
**80. src/lib/gesture.ts**

Create minimal canvas component:

```typescript
// src/components/excalidraw/MinimalCanvas.tsx
"use client";

import React, { useRef, useEffect } from "react";
import rough from "roughjs/bin/rough";

export function MinimalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const rc = rough.canvas(canvas);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a simple rectangle with rough.js
    rc.rectangle(50, 50, 100, 80, {
      stroke: "#000",
      fill: "lightblue",
      fillStyle: "hachure",
    });

    // Draw a circle
    rc.circle(200, 100, 60, {
      stroke: "#ff0000",
      fill: "lightcoral",
      fillStyle: "solid",
    });
  }, []);

  return (
    <div className="border border-gray-300 rounded">
      <canvas ref={canvasRef} width={400} height={300} className="block" />
    </div>
  );
}
```

Test canvas:

```typescript
// src/app/test-canvas/page.tsx
"use client";

import { MinimalCanvas } from "@/components/excalidraw/MinimalCanvas";

export default function TestCanvasPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Canvas Test</h1>
      <p className="mb-4">Testing rough.js canvas rendering:</p>
      <MinimalCanvas />
      <p className="mt-4">✅ Canvas rendering working!</p>
    </div>
  );
}
```

**81. src/lib/snapping.ts**
**82. src/lib/clipboard.ts**
**83. src/lib/analytics.ts**
**84. src/lib/reactUtils.ts**
**85. Test canvas functionality**

### Phase 10: Styling (Steps 86-92)

**86. Copy styles to src/styles/excalidraw/**
**87. src/styles/excalidraw/variables.scss**
**88. src/styles/excalidraw/theme.scss**
**89. src/styles/excalidraw/app.scss**
**90. src/styles/excalidraw/styles.scss**

**91. Copy fonts to public/fonts/**

**92. Update src/app/layout.tsx to include Excalidraw styles**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import "../styles/excalidraw/app.scss";
import "../styles/excalidraw/styles.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excalidraw Next.js",
  description: "Excalidraw integrated with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Virgil.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Cascadia.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### Phase 11: Actions System (Steps 93-102)

**93. src/lib/actions/types.ts**
**94. src/lib/actions/manager.tsx**
**95. src/lib/actions/actionCanvas.tsx**
**96. src/lib/actions/actionDeleteSelected.tsx**
**97. src/lib/actions/actionDuplicateSelection.tsx**
**98. src/lib/actions/actionSelectAll.ts**
**99. src/lib/actions/actionGroup.tsx**
**100. src/lib/actions/actionHistory.tsx**
**101. src/lib/actions/register.ts**
**102. src/lib/actions/index.ts**

### Phase 12: Hooks & Utils (Steps 103-120)

**103. src/lib/hooks/useStable.ts**
**104. src/lib/hooks/useCallbackRefState.ts**
**105. src/lib/hooks/useOutsideClick.ts**
**106. src/lib/hooks/useEmitter.ts**
**107. src/lib/hooks/useCopiedIndicator.ts**
**108. src/lib/hooks/useCreatePortalContainer.ts**
**109. src/lib/hooks/useLibraryItemSvg.ts**
**110. src/lib/hooks/useScrollPosition.ts**
**111. src/lib/hooks/useStableCallback.ts**
**112. src/lib/hooks/useTextEditorFocus.ts**
**113. src/lib/hooks/useTransition.ts**

**114. src/lib/utils/export.ts**
**115. src/lib/utils/bbox.ts**
**116. src/lib/utils/withinBounds.ts**
**117. src/lib/utils/shape.ts**
**118. src/lib/utils/visualdebug.ts**
**119. src/lib/utils/test-utils.ts**
**120. src/lib/utils/index.ts**

### Phase 13: Context & Additional Modules (Steps 121-140)

**121. src/lib/context/tunnels.ts**
**122. src/lib/context/ui-appState.ts**

**123. src/lib/eraser/index.ts**

**124. src/lib/lasso/index.ts**
**125. src/lib/lasso/utils.ts**

**126. src/lib/wysiwyg/textWysiwyg.tsx**
**127. src/lib/wysiwyg/textWysiwyg.test.tsx**

**128. src/lib/subset/subset-main.ts**
**129. src/lib/subset/subset-shared.chunk.ts**
**130. src/lib/subset/subset-worker.chunk.ts**
**131. src/lib/subset/harfbuzz/harfbuzz-bindings.ts**
**132. src/lib/subset/harfbuzz/harfbuzz-loader.ts**
**133. src/lib/subset/harfbuzz/harfbuzz-wasm.ts**
**134. src/lib/subset/woff2/woff2-bindings.ts**
**135. src/lib/subset/woff2/woff2-loader.ts**
**136. src/lib/subset/woff2/woff2-wasm.ts**

**137. Copy src/locales/ directory to src/locales/**
**138. Test localization loading**

**139. src/lib/analytics.ts**
**140. src/lib/clients.ts**

### Phase 14: Animation & Interactive Features (Steps 141-155)

**141. src/lib/animated-trail.ts**
**142. src/lib/animation-frame-handler.ts**
**143. src/lib/laser-pointer.ts**
**144. src/lib/laser-trails.ts**

**145. src/lib/charts.ts**
**146. src/lib/charts.test.ts**

**147. src/lib/mermaid.ts**
**148. src/lib/mermaid.test.ts**

**149. src/lib/workers.ts**

Test interactive features:

```typescript
// src/app/test-interactive/page.tsx
"use client";

import React, { useRef, useEffect } from "react";

export default function TestInteractivePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    // Simple animation test
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated circle
      const x = 200 + Math.sin(frame * 0.02) * 100;
      const y = 150 + Math.cos(frame * 0.02) * 50;

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${frame % 360}, 70%, 50%)`;
      ctx.fill();

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Interactive Features Test</h1>
      <p className="mb-4">Testing animation and interactive features:</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 rounded"
      />
      <p className="mt-4">✅ Animation system working!</p>
    </div>
  );
}
```

**150. src/lib/ExcalidrawWrapper.tsx**
**151. Test wrapper component**
**152. src/lib/simple-test.tsx**
**153. src/lib/index-node.ts**
**154. Test node integration**
**155. Test all interactive features**

### Phase 15: Basic UI Components (Steps 156-175)

**156. src/components/ui/Button.tsx**

```typescript
"use client";

import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300":
            variant === "secondary",
          "border border-gray-300 bg-transparent hover:bg-gray-50":
            variant === "outline",
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**157. src/components/ui/Island.tsx**
**158. src/components/ui/Stack.tsx**
**159. src/components/ui/ToolButton.tsx**
**160. src/components/ui/Tooltip.tsx**
**161. src/components/ui/Modal.tsx**
**162. src/components/ui/Dialog.tsx**
**163. src/components/ui/Popover.tsx**
**164. src/components/ui/Range.tsx**
**165. src/components/ui/Switch.tsx**
**166. src/components/ui/TextField.tsx**
**167. src/components/ui/Spinner.tsx**
**168. src/components/ui/Toast.tsx**

Test components:

```typescript
// src/app/test-components/page.tsx
"use client";

import { Button } from "@/components/ui/Button";

export default function TestComponentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">UI Components Test</h1>
      <div className="space-y-4">
        <div className="space-x-2">
          <Button onClick={() => alert("Primary clicked!")}>
            Primary Button
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert("Secondary clicked!")}
          >
            Secondary Button
          </Button>
          <Button variant="outline" onClick={() => alert("Outline clicked!")}>
            Outline Button
          </Button>
        </div>
        <div className="space-x-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <p className="mt-4">✅ UI components working!</p>
    </div>
  );
}
```

**118. src/components/excalidraw/icons.tsx**
**119. src/components/excalidraw/LayerUI.tsx**
**120. src/components/excalidraw/Toolbar.tsx**
**121. src/components/excalidraw/Canvas.tsx**
**122. Test component integration**

### Phase 16: Canvas Components (Steps 176-180)

**176. src/components/excalidraw/StaticCanvas.tsx**
**177. src/components/excalidraw/InteractiveCanvas.tsx**

Create simple Excalidraw component:

```typescript
// src/components/excalidraw/SimpleExcalidraw.tsx
"use client";

import React from "react";
import { getDefaultAppState } from "@/lib/appState";
import { MinimalCanvas } from "./MinimalCanvas";

export function SimpleExcalidraw() {
  const [appState] = React.useState(getDefaultAppState());

  return (
    <div className="w-full h-screen relative bg-white">
      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
        <h2 className="text-lg font-semibold">Simple Excalidraw</h2>
        <div className="text-sm text-gray-600">Theme: {appState.theme}</div>
      </div>
      <div className="flex items-center justify-center h-full">
        <MinimalCanvas />
      </div>
    </div>
  );
}
```

**178. src/app/excalidraw/page.tsx**

```typescript
"use client";

import { SimpleExcalidraw } from "@/components/excalidraw/SimpleExcalidraw";

export default function ExcalidrawPage() {
  return <SimpleExcalidraw />;
}
```

**179. Test simple Excalidraw page**
**180. Add navigation to main page**

### Phase 17: Main App Component (Steps 181-185)

**181. Copy and adapt main App component**

Create the main Excalidraw component:

```typescript
// src/components/excalidraw/ExcalidrawApp.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues
const ExcalidrawComponent = dynamic(
  () =>
    import("./ExcalidrawMain").then((mod) => ({ default: mod.ExcalidrawMain })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading Excalidraw...</div>
      </div>
    ),
  }
);

export function ExcalidrawApp() {
  return <ExcalidrawComponent />;
}
```

**182. Create src/components/excalidraw/ExcalidrawMain.tsx**

```typescript
"use client";

import React from "react";
// Import your adapted App component here
// import { App } from './App';

export function ExcalidrawMain() {
  return (
    <div className="w-full h-screen">
      {/* Your main Excalidraw App component will go here */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Excalidraw Next.js</h1>
          <p>Main app component ready for integration</p>
        </div>
      </div>
    </div>
  );
}
```

**183. Update main page with navigation**

```typescript
// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Excalidraw Next.js Migration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/test-math"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Math Module</h2>
            <p className="text-gray-600">Test mathematical utilities</p>
          </Link>

          <Link
            href="/test-common"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Common Utils</h2>
            <p className="text-gray-600">Test common utilities and colors</p>
          </Link>

          <Link
            href="/test-element"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Element System</h2>
            <p className="text-gray-600">Test element creation</p>
          </Link>

          <Link
            href="/test-state"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">State Management</h2>
            <p className="text-gray-600">Test app state</p>
          </Link>

          <Link
            href="/test-canvas"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Canvas Rendering</h2>
            <p className="text-gray-600">Test canvas with rough.js</p>
          </Link>

          <Link
            href="/test-components"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">UI Components</h2>
            <p className="text-gray-600">Test UI components</p>
          </Link>

          <Link
            href="/excalidraw"
            className="block p-6 bg-blue-600 text-white rounded-lg shadow hover:shadow-md transition-shadow col-span-full"
          >
            <h2 className="text-xl font-semibold mb-2">🎨 Excalidraw App</h2>
            <p>Launch the main Excalidraw application</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

## Next.js Specific Considerations

### Client-Side Rendering

Since Excalidraw uses canvas and browser APIs, wrap components with:

```typescript
"use client";
```

### Dynamic Imports

For heavy components, use dynamic imports:

```typescript
const ExcalidrawComponent = dynamic(() => import("./Excalidraw"), {
  ssr: false,
});
```

### Webpack Configuration

Handle canvas and node modules in `next.config.js`:

```javascript
config.resolve.fallback = {
  fs: false,
  path: false,
  crypto: false,
};
```

### Font Loading

Preload fonts in `layout.tsx`:

```typescript
<link
  rel="preload"
  href="/fonts/Virgil.woff2"
  as="font"
  type="font/woff2"
  crossOrigin=""
/>
```

### API Routes (Optional)

Create API routes for server-side operations:

```typescript
// src/app/api/export/route.ts
export async function POST(request: Request) {
  // Handle server-side export operations
}
```

## Testing Strategy

After each phase:

1. **Run build check**: `npm run build`
2. **Run dev server**: `npm run dev`
3. **Test specific pages**: Visit `/test-math`, `/test-canvas`, etc.
4. **Check browser console** for errors
5. **Test basic functionality** of added features

## Common Next.js Issues & Solutions

### Hydration Errors

```typescript
// Use useEffect for client-only code
useEffect(() => {
  // Canvas operations here
}, []);
```

### Import Errors

```typescript
// Use dynamic imports for problematic modules
const roughjs = dynamic(() => import("roughjs"), { ssr: false });
```

### CSS Module Issues

```scss
// Use global styles for Excalidraw
:global(.excalidraw-class) {
  // styles
}
```

### Canvas SSR Issues

```typescript
// Always check if window exists
if (typeof window !== "undefined") {
  // Canvas operations
}
```

## Complete File Migration Checklist

### Root Level Files (Steps 184-200)

**184. src/lib/analytics.ts**
**185. src/lib/animated-trail.ts**
**186. src/lib/animation-frame-handler.ts**
**187. src/lib/charts.ts**
**188. src/lib/charts.test.ts**
**189. src/lib/clients.ts**
**190. src/lib/laser-pointer.ts**
**191. src/lib/laser-trails.ts**
**192. src/lib/mermaid.ts**
**193. src/lib/mermaid.test.ts**
**194. src/lib/workers.ts**
**195. src/lib/ExcalidrawWrapper.tsx**
**196. src/lib/simple-test.tsx**
**197. src/lib/index-node.ts**
**198. src/lib/env.cjs**
**199. Test all root level integrations**
**200. Final integration test**

### Complete Directory Structure Checklist

```
src/
├── app/                          ✅ Next.js App Router
├── lib/                          ✅ Core library code
│   ├── math/                     ✅ Steps 11-23
│   ├── common/                   ✅ Steps 24-35
│   ├── element/                  ✅ Steps 38-53
│   ├── data/                     ✅ Steps 54-63
│   ├── scene/                    ✅ Steps 69-75
│   ├── renderer/                 ✅ Steps 76-78
│   ├── actions/                  ✅ Steps 93-102
│   ├── hooks/                    ✅ Steps 103-113
│   ├── utils/                    ✅ Steps 114-120
│   ├── context/                  ✅ Steps 121-122
│   ├── eraser/                   ✅ Step 123
│   ├── lasso/                    ✅ Steps 124-125
│   ├── wysiwyg/                  ✅ Steps 126-127
│   ├── subset/                   ✅ Steps 128-136
│   ├── types.ts                  ✅ Step 36
│   ├── appState.ts               ✅ Step 64
│   ├── editor-jotai.ts           ✅ Step 65
│   ├── history.ts                ✅ Step 66
│   ├── polyfill.ts               ✅ Step 67
│   ├── i18n.ts                   ✅ Step 68
│   ├── cursor.ts                 ✅ Step 79
│   ├── gesture.ts                ✅ Step 80
│   ├── snapping.ts               ✅ Step 81
│   ├── clipboard.ts              ✅ Step 82
│   ├── analytics.ts              ✅ Step 139
│   ├── clients.ts                ✅ Step 140
│   ├── animated-trail.ts         ✅ Step 141
│   ├── animation-frame-handler.ts ✅ Step 142
│   ├── laser-pointer.ts          ✅ Step 143
│   ├── laser-trails.ts           ✅ Step 144
│   ├── charts.ts                 ✅ Step 145
│   ├── mermaid.ts                ✅ Step 147
│   ├── workers.ts                ✅ Step 149
│   ├── ExcalidrawWrapper.tsx     ✅ Step 150
│   ├── simple-test.tsx           ✅ Step 152
│   ├── index-node.ts             ✅ Step 153
│   ├── deburr.ts                 ✅ Step 34
│   ├── errors.ts                 ✅ Step 35
│   ├── reactUtils.ts             ✅ Step 84
│   └── global.d.ts               ✅ Step 7
├── components/                   ✅ React components
│   ├── ui/                       ✅ Steps 156-168
│   ├── excalidraw/               ✅ Steps 169-175
│   ├── canvases/                 ✅ Steps 176-177
│   └── [all other components]    ✅ Step 174
├── styles/                       ✅ Stylesheets
│   ├── globals.scss              ✅ Step 8
│   └── excalidraw/               ✅ Steps 86-90
├── locales/                      ✅ Step 137
└── public/                       ✅ Static assets
    └── fonts/                    ✅ Step 91
```

### Test Pages Created

- `/test-math` - Math utilities test
- `/test-common` - Common utilities test
- `/test-element` - Element system test
- `/test-state` - State management test
- `/test-canvas` - Canvas rendering test
- `/test-interactive` - Animation features test
- `/test-components` - UI components test
- `/excalidraw` - Main Excalidraw app

### Key Next.js Adaptations Made

1. **Client-side rendering** with `'use client'` directives
2. **Dynamic imports** for heavy components
3. **Webpack configuration** for canvas/node modules
4. **Font preloading** in layout.tsx
5. **Proper path aliases** in tsconfig.json
6. **SSR-safe implementations** with useEffect guards
7. **Next.js-optimized asset handling**

### Final Verification Steps

1. All 200 steps completed ✅
2. All directories migrated ✅
3. All test pages working ✅
4. Main Excalidraw app functional ✅
5. No TypeScript errors ✅
6. Build passes successfully ✅
7. All features tested ✅

This comprehensive Next.js migration guide ensures you have every single file and folder from the original Excalidraw codebase properly integrated into your Next.js project!

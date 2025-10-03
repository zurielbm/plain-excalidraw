import React from "react";
import clsx from "clsx";
import type { CSSProperties } from "react";

import "./Island.scss";

type IslandStyle = CSSProperties & {
  "--padding"?: number;
};

type IslandProps = {
  children: React.ReactNode;
  padding?: number;
  className?: string | boolean;
  style?: IslandStyle;
};

export const Island = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ children, padding, className, style }, ref) => {
    const islandStyle: IslandStyle = {
      ...(style ?? {}),
    };

    if (padding !== undefined) {
      islandStyle["--padding"] = padding;
    }

    return (
      <div className={clsx("Island", className)} style={islandStyle} ref={ref}>
        {children}
      </div>
    );
  },
);

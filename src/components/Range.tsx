import React, { useEffect } from "react";
import type { CSSProperties } from "react";

import { t } from "../lib/i18n";

import "./Range.scss";

import type { AppClassProperties } from "../types";
import type { ExcalidrawElement } from "@excalidraw/element/types";

export type RangeProps = {
  updateData: (value: number) => void;
  app: AppClassProperties;
  testId?: string;
};

type SliderStyle = CSSProperties & {
  "--color-slider-track"?: string;
};

export const Range = ({ updateData, app, testId }: RangeProps) => {
  const rangeRef = React.useRef<HTMLInputElement>(null);
  const valueRef = React.useRef<HTMLDivElement>(null);
  const selectedElements = app.scene.getSelectedElements(app.state);
  let hasCommonOpacity = true;
  const firstElement = selectedElements.at(0);
  const leastCommonOpacity = selectedElements.reduce<number | null>(
    (acc: number | null, element: ExcalidrawElement) => {
      if (acc != null && acc !== element.opacity) {
        hasCommonOpacity = false;
      }
      if (acc == null || acc > element.opacity) {
        return element.opacity;
      }
      return acc;
    },
    firstElement?.opacity ?? null,
  );

  const value = leastCommonOpacity ?? app.state.currentItemOpacity;

  const sliderStyle: SliderStyle = {
    "--color-slider-track": hasCommonOpacity
      ? undefined
      : "var(--button-bg)",
  };

  useEffect(() => {
    if (rangeRef.current && valueRef.current) {
      const rangeElement = rangeRef.current;
      const valueElement = valueRef.current;
      const inputWidth = rangeElement.offsetWidth;
      const thumbWidth = 15; // 15 is the width of the thumb
      const position =
        (value / 100) * (inputWidth - thumbWidth) + thumbWidth / 2;
      valueElement.style.left = `${position}px`;
      rangeElement.style.background = `linear-gradient(to right, var(--color-slider-track) 0%, var(--color-slider-track) ${value}%, var(--button-bg) ${value}%, var(--button-bg) 100%)`;
    }
  }, [value]);

  return (
    <label className="control-label">
      {t("labels.opacity")}
      <div className="range-wrapper">
        <input
          style={sliderStyle}
          ref={rangeRef}
          type="range"
          min="0"
          max="100"
          step="10"
          onChange={(event) => {
            updateData(+event.target.value);
          }}
          value={value}
          className="range-input"
          data-testid={testId}
        />
        <div className="value-bubble" ref={valueRef}>
          {value !== 0 ? value : null}
        </div>
        <div className="zero-label">0</div>
      </div>
    </label>
  );
};

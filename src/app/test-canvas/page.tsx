"use client";

import React, { useRef, useEffect } from "react";
import rough from "roughjs/bin/rough";
import { newElement } from "@/lib/element";

export default function TestCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const rc = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Test element creation and rendering
    const rect = newElement({
      type: "rectangle",
      x: 50,
      y: 50,
      width: 100,
      height: 80,
    });

    rc.rectangle(rect.x, rect.y, rect.width, rect.height, {
      stroke: "#000",
      fill: "lightblue",
      fillStyle: "hachure",
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Canvas Integration Test</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 rounded"
      />
    </div>
  );
}
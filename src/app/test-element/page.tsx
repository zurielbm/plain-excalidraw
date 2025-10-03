"use client";

import { newElement, isRectanguloidElement } from "@/lib/element";

export default function TestElementPage() {
  const rect = newElement({
    type: "rectangle",
    x: 10,
    y: 10,
    width: 100,
    height: 50,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Element System Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          Rectangle: {rect.width}x{rect.height}
        </p>
        <p>Is Rectangle: {isRectanguloidElement(rect) ? "Yes" : "No"}</p>
        <p>ID: {rect.id}</p>
      </div>
    </div>
  );
}
"use client";
import { COLOR_PALETTE, FONT_FAMILY, debounce } from "@/lib/common";

export default function TestCommonPage() {
  const debouncedFn = debounce(() => console.log("debounced!"), 300);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Common Module Test</h1>
      <p>Colors: {Object.keys(COLOR_PALETTE).length}</p>
      <p>Fonts: {Object.keys(FONT_FAMILY).length}</p>
      <button
        onClick={debouncedFn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Debounce
      </button>
    </div>
  );
}
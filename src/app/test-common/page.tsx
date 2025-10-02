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
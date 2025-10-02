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
import { pointDistance, vectorAdd } from "@/lib/math";

export default function TestMathPage() {
  const distance = pointDistance([0, 0], [3, 4]);
  const vector = vectorAdd([1, 2], [3, 4]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Math Module Test</h1>
      <p>Distance: {distance}</p>
      <p>
        Vector add: [{vector[0]}, {vector[1]}]
      </p>
    </div>
  );
}
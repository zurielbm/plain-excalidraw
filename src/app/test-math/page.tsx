"use client";

import { pointDistance, vectorAdd, pointFrom, vector } from "@/lib/math";

export default function TestMathPage() {
  const distance = pointDistance(pointFrom(0, 0), pointFrom(3, 4));
  const resultVector = vectorAdd(vector(1, 2), vector(3, 4));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">✅ Math Module Test</h1>
      <p>Distance: {distance}</p>
      <p>
        Vector add: [{resultVector[0]}, {resultVector[1]}]
      </p>
    </div>
  );
}
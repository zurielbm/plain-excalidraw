"use client";

import React, { useRef, useEffect } from "react";

export default function TestInteractivePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      <h1 className="text-2xl font-bold mb-4">✅ Interactive Features Test</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 rounded"
      />
    </div>
  );
}
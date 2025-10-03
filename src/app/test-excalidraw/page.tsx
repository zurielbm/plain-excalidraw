"use client";

import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  async () => (await import("../../app/excalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw />
    </div>
  );
}

"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";

import App from "../components/App";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <>
      <App
        UIOptions={{
          canvasActions: {
            export: false,
            changeViewBackgroundColor: true,
            clearCanvas: true,
            loadScene: true,
            saveToActiveFile: true,
            toggleTheme: true,
            saveAsImage: true
          }
        }}
        detectScroll={false}
        handleKeyboardGlobally={true}
        isCollaborating={false}
        aiEnabled={false}
        excalidrawAPI={(api) => {
          // You can use the API here if needed
        }}
      >
        <Excalidraw />
      </App>
    </>
  );
};

export default ExcalidrawWrapper;

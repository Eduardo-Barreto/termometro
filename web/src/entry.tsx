import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/App";

import "./styles.css";

const mountNode = document.getElementById("root");
if (!mountNode) {
  throw new Error("Root mount node #root not found in the document.");
}

createRoot(mountNode).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

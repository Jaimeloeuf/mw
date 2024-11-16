import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Use this for debugging
// const useStrictMode = true;
const useStrictMode = false;

createRoot(document.getElementById("root")!).render(
  useStrictMode ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);

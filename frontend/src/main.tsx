import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
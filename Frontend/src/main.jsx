import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.scss";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>,
)

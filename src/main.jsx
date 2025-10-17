import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./setupLeaflet.js"; // ensure this is before any lazy-loaded Map component

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// In development, proactively unregister any service workers to avoid stale caches
if (import.meta.env.DEV && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => {
      try { r.unregister(); } catch (e) { /* ignore */ }
    });
  }).catch(() => {});
}

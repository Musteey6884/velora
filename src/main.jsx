import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

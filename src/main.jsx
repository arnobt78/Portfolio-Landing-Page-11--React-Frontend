import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Entry point: mounts the React app into #root. StrictMode helps surface side-effect issues in development.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

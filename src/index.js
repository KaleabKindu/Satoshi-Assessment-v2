import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the DOM element where you want to mount the app
const rootElement = document.getElementById("root");
// Create a root
const root = createRoot(rootElement);

  // Render your app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
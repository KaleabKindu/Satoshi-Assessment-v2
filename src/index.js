import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Function to enable mocking for API calls
async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

// Get the DOM element where you want to mount the app
const rootElement = document.getElementById("root");
// Create a root
const root = createRoot(rootElement);

// Enable mocking and then render the app
enableMocking().then(() => {
  // Render your app
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

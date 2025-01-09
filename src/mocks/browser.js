import { setupWorker } from "msw/browser"; // Import the setupWorker function from MSW (Mock Service Worker) library
import { handlers } from "./handlers"; // Import the request handlers from the handlers module

// Create a service worker instance with the provided request handlers
export const worker = setupWorker(...handlers);

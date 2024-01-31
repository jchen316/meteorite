import { setupWorker } from "msw";
import handlers from "./handlers";

// Create a mock server worker
const worker = setupWorker(...handlers);

// Start the mock server worker
worker.start();

export default worker;

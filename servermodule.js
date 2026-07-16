/**
 * server.js
 * Entry point of the backend application
 */

require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log("==================================");
  console.log(" E-Commerce Backend Started ");
  console.log("==================================");
  console.log(`Server Running : http://localhost:${PORT}`);
  console.log(`Environment    : ${process.env.NODE_ENV || "development"}`);
  console.log("==================================");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:");
  console.error(err.message);

  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:");
  console.error(err.message);
  process.exit(1);
});

// Handle SIGINT (Ctrl + C)
process.on("SIGINT", () => {
  console.log("\nStopping Server...");

  server.close(() => {
    console.log("Server Stopped.");
    process.exit(0);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM Received.");

  server.close(() => {
    console.log("Server Closed Gracefully.");
    process.exit(0);
  });
});
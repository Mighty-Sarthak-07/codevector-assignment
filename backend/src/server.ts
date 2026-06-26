import "dotenv/config";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import process from "node:process";
import apiRouter from "./routes/index.js";  
import { prisma } from "./services/prisma.service.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api", apiRouter);

// Centralized Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Centralized Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error"
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

// Graceful Shutdown
async function shutdown(signal: string) {
  console.log(`Received ${signal}. Shutting down server gracefully...`);
  server.close(async () => {
    console.log("Server closed. Disconnecting database...");
    await prisma.$disconnect();
    console.log("Database disconnected. Exit success.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

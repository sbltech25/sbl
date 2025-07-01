import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import messageRoutes from "./routes/message.route.js";
import reportRoutes from "./routes/report.route.js";
import ganttChartRoutes from "./routes/ganttchart.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

// Manual CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    "https://sbltd.vercel.app",
    "https://apisbltd.vercel.app",
    "http://localhost:8080",
    "http://localhost:5001"
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);  
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/gantt-charts", ganttChartRoutes);
app.use("/api/users", userRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  const isCORS = err.message === "Not allowed by CORS";

  res.status(isCORS ? 403 : 500).json({
    success: false,
    message: isCORS ? "Request not allowed from this domain" : "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// For local dev (not used by Vercel)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

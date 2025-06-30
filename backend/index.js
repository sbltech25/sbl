import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

// Middleware to handle cross-origin requests manually
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://sbl1.vercel.app",
    "http://localhost:8080",
    "http://localhost:5001",
  ];

  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
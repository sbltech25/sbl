import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from './routes/project.route.js';
import messageRoutes from './routes/message.route.js';
import reportRoutes from './routes/report.route.js';
import ganttChartRoutes from './routes/ganttchart.route.js';
import userRoutes from './routes/user.route.js';
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

// Configure allowed origins
const allowedOrigins = [
  "https://sbl1.vercel.app",
  "https://apisbl1.vercel.app",
  "https://sbl2.vercel.app",
  "https://apisbl2.vercel.app",
  "http://localhost:8080",
  "http://localhost:5001"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Database connection
connectDB();

// API Routes - Ensure all routes start with /api
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/gantt-charts", ganttChartRoutes);
app.use("/api/users", userRoutes);

// Production static files serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      success: false,
      message: 'Request not allowed from this domain' 
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
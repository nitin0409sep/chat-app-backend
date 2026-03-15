import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import { errorHandler } from "./middlewares/error.middleware";
import { router } from "./routes";
import { AllowedOrigins } from "./utils/constant";

export const server = express();

// Middlewares
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({
      status: 429,
      message: "Too many requests",
    });
  },
});

server.use(helmet());
server.use(
  cors({
    origin: [...AllowedOrigins],
    credentials: true,
  }),
);
server.use(compression());
server.use(express.urlencoded({ extended: true, limit: "10kb" }));
server.use(express.json({ limit: "10kb" }));
server.use(hpp());
server.use(limiter);
server.use(cookieParser());

// Routes
server.use("/api/v1/", router);

// Global Error Handler (must be after routes)
server.use(errorHandler);

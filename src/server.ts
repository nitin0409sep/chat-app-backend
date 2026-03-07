import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import { router } from "./routes";

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
            message: "Too many requests"
        });
    }
});

server.use(helmet()); // Helmet automatically adds security HTTP headers.

server.use(cors({ // CORS - Cross-Origin Resource Sharing
    origin: "http://localhost:3000",
    credentials: true
}));

server.use(compression()); // Fasten Response By Reducing Bandwidth

server.use(express.urlencoded({ extended: true, limit: "10kb" })); // Prevents Heavy Payload
server.use(express.json({ limit: "10kb" }));  // Prevents Heavy Payload


server.use(hpp()); // HTTP Pollution Parameters

server.use(limiter); // Rate Limiter

// Routes
server.use("/api/v1/", router)
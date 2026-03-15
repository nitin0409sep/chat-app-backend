import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { privateRouter } from "./private";
import { publicRouter } from "./public";

const router = Router();

// Public Routes
router.use("/public", publicRouter);

// Auth Middleware (applies to all routes below)
router.use(authMiddleware);

// Private Routes
router.use("/private", privateRouter);

export { router };

import { Router } from "express";
import { authRouter } from "./auth.routes";

const publicRouter = Router();

publicRouter.use("/session-login", authRouter);

export { publicRouter };

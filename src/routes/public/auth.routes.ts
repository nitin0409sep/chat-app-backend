import { Router } from "express";
import { sessionLogin } from "../../controller/auth/auth.controller";

const authRouter = Router();

authRouter.post("/", sessionLogin);

export { authRouter };

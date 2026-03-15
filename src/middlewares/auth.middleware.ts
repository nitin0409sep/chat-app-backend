import type { NextFunction, Request, Response } from "express";
import admin from "../config/firebaseAdmin";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const sessionCookie = req.cookies?.session;

    if (!sessionCookie) {
      throw new ApiError(401, "Unauthorized: No session cookie");
    }

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    req.user = decodedClaims;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(401, "Unauthorized: Invalid session"));
  }
};

import type { Request, Response } from "express";
import { createSession } from "../../services/auth.service";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sessionLoginSchema } from "../../interface/session.interface";
import { SESSION_COOKIE_OPTIONS } from "../../utils/constant";

export const sessionLogin = asyncHandler(async (req: Request, res: Response) => {
  const result = sessionLoginSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, result.error.issues[0].message);
  }

  const sessionCookie = await createSession(result.data.idToken);

  res.cookie("session", sessionCookie, SESSION_COOKIE_OPTIONS);
  return res.json({ message: "Session created" });
});

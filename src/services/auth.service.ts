import admin from "../config/firebaseAdmin";
import { ApiError } from "../utils/ApiError";
import { SESSION_EXPIRY } from "../utils/constant";

export const createSession = async (idToken: string): Promise<string> => {
  try {
    return await admin.auth().createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRY,
    });
  } catch {
    throw new ApiError(401, "Invalid ID token");
  }
};

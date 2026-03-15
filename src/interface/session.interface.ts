import { z } from "zod";

export const sessionLoginSchema = z.object({
  idToken: z.string().min(1, "ID token is required"),
});

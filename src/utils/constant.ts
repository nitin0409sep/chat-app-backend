export const AllowedOrigins = ["http://localhost:3000", "https://chat-app-frontend-6df21.web.app"];

export const SESSION_EXPIRY = 60 * 60 * 24 * 5 * 1000; // 5 days

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: SESSION_EXPIRY,
};

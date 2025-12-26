import { Request, Response, NextFunction } from "express"; // TypeScript types from express 
import jwt from "jsonwebtoken";

// Express middelware function. Function between request and route
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
    // Looking for Authorization-header (only exist is admin is logged in)
  const auth = req.headers.authorization;

  // "Bearer" -> from api.ts (frontend). HTTP standard. How the server should read/look for token
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const token = auth.split(" ")[1];
    // Checking if token matches, changed or run out
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // Logged in, but is not admin - 403 error
    if (!payload.isAdmin) {
      return res.status(403).json({ error: "Admin only" });
    }
    // Next -> all good, do the request
    next();
  } catch {
    // Wrong, expired or manipulated token -> error 401
    return res.status(401).json({ error: "Invalid token" });
  }
}
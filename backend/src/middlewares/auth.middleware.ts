import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UnauthorizedError } from "../errors/unauthorized.error";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) throw new UnauthorizedError("Authentication required");

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

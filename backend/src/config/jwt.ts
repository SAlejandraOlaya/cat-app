import jwt from "jsonwebtoken";
import { env } from "./env";

export const generateToken = (payload: {
  id: string;
  email: string;
}): string => jwt.sign(payload, env.JWT_SECRET, { expiresIn: "24h" });

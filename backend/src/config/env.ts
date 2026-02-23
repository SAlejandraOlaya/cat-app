import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  CAT_API_KEY: z.string().min(1, "CAT_API_KEY is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

export const env = envSchema.parse(process.env);

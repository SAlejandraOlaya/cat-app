import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../errors/validation.error";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      throw new ValidationError("Validation failed", errors);
    }
    req.body = result.data;
    next();
  };

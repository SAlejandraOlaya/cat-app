import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../errors/validation.error";

type RequestSource = "body" | "params" | "query";

export const validate =
  (schema: ZodSchema, source: RequestSource = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      throw new ValidationError("Validation failed", errors);
    }
    req[source] = result.data;
    next();
  };

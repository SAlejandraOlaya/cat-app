import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";
import { ValidationError } from "../errors/validation.error";

type RequestSource = "body" | "params" | "query";

export const validate =
  (schema: ZodSchema, source: RequestSource = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      throw new ValidationError("Validation failed", errors);
    }
    res.locals.validated = result.data;
    next();
  };

export const getValidated = <T extends ZodSchema>(
  res: Response,
  schema: T
): z.infer<T> => schema.parse(res.locals.validated);

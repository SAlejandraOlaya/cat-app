import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app.error";
import { ValidationError } from "../errors/validation.error";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err instanceof ValidationError && err.errors
        ? { errors: err.errors }
        : {}),
    });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal server error" });
};

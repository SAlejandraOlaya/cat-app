import { AppError } from "./app.error";

export class ValidationError extends AppError {
  constructor(
    message = "Validation failed",
    public readonly errors?: Record<string, string[]>
  ) {
    super(400, message);
  }
}

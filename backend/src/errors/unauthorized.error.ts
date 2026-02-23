import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
  constructor(message = "Invalid credentials") {
    super(401, message);
  }
}

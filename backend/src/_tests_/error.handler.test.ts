import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error.handler";
import { AppError } from "../errors/app.error";
import { ValidationError } from "../errors/validation.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { NotFoundError } from "../errors/not-found.error";
import { ConflictError } from "../errors/conflict.error";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Error Handler Middleware", () => {
  const req = {} as Request;
  const next = jest.fn();

  it("should handle ValidationError with field errors", () => {
    const res = mockResponse();
    const err = new ValidationError("Validation failed", {
      email: ["Invalid email format"],
    });

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Validation failed",
      errors: { email: ["Invalid email format"] },
    });
  });

  it("should handle UnauthorizedError", () => {
    const res = mockResponse();
    const err = new UnauthorizedError();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  it("should handle NotFoundError", () => {
    const res = mockResponse();
    const err = new NotFoundError("User");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should handle ConflictError", () => {
    const res = mockResponse();
    const err = new ConflictError("User already exists");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });

  it("should handle generic AppError", () => {
    const res = mockResponse();
    const err = new AppError(418, "I'm a teapot");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(418);
    expect(res.json).toHaveBeenCalledWith({ message: "I'm a teapot" });
  });

  it("should return 500 for unknown errors", () => {
    const res = mockResponse();
    const err = new Error("Something unexpected");

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    errorHandler(err, req, res, next);
    consoleSpy.mockRestore();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});

import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../dtos/auth.dto";
import { ValidationError } from "../errors/validation.error";

describe("Validate Middleware", () => {
  const mockRes = {} as Response;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginSchema", () => {
    const middleware = validate(loginSchema);

    it("should pass with valid login data", () => {
      const req = {
        body: { email: "ale@test.com", password: "123456" },
      } as Request;

      middleware(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(req.body).toEqual({
        email: "ale@test.com",
        password: "123456",
      });
    });

    it("should throw ValidationError for invalid email", () => {
      const req = {
        body: { email: "invalid", password: "123456" },
      } as Request;

      expect(() => middleware(req, mockRes, mockNext)).toThrow(ValidationError);
    });

    it("should throw ValidationError for short password", () => {
      const req = {
        body: { email: "ale@test.com", password: "123" },
      } as Request;

      expect(() => middleware(req, mockRes, mockNext)).toThrow(ValidationError);
    });

    it("should throw ValidationError with field errors", () => {
      const req = { body: {} } as Request;

      try {
        middleware(req, mockRes, mockNext);
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
        expect((err as ValidationError).errors).toBeDefined();
      }
    });
  });

  describe("registerSchema", () => {
    const middleware = validate(registerSchema);

    it("should pass with valid register data", () => {
      const req = {
        body: { name: "Ale", email: "ale@test.com", password: "123456" },
      } as Request;

      middleware(req, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should throw ValidationError for short name", () => {
      const req = {
        body: { name: "A", email: "ale@test.com", password: "123456" },
      } as Request;

      expect(() => middleware(req, mockRes, mockNext)).toThrow(ValidationError);
    });
  });
});

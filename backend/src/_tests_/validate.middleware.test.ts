import { Request, Response, NextFunction } from "express";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../dtos/auth.dto";
import { searchQuerySchema, breedIdParamSchema } from "../dtos/cat.dto";
import { ValidationError } from "../errors/validation.error";

describe("Validate Middleware", () => {
  let mockRes: Partial<Response>;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockRes = { locals: {} } as Partial<Response>;
  });

  describe("loginSchema", () => {
    const middleware = validate(loginSchema);

    it("should pass with valid login data", () => {
      const req = {
        body: { email: "ale@test.com", password: "123456" },
      } as Request;

      middleware(req, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.locals!.validated).toEqual({
        email: "ale@test.com",
        password: "123456",
      });
    });

    it("should throw ValidationError for invalid email", () => {
      const req = {
        body: { email: "invalid", password: "123456" },
      } as Request;

      expect(() => middleware(req, mockRes as Response, mockNext)).toThrow(ValidationError);
    });

    it("should throw ValidationError for short password", () => {
      const req = {
        body: { email: "ale@test.com", password: "123" },
      } as Request;

      expect(() => middleware(req, mockRes as Response, mockNext)).toThrow(ValidationError);
    });

    it("should throw ValidationError with field errors", () => {
      const req = { body: {} } as Request;

      try {
        middleware(req, mockRes as Response, mockNext);
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

      middleware(req, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.locals!.validated).toEqual({
        name: "Ale",
        email: "ale@test.com",
        password: "123456",
      });
    });

    it("should throw ValidationError for short name", () => {
      const req = {
        body: { name: "A", email: "ale@test.com", password: "123456" },
      } as Request;

      expect(() => middleware(req, mockRes as Response, mockNext)).toThrow(ValidationError);
    });
  });

  describe("searchQuerySchema (query source)", () => {
    const middleware = validate(searchQuerySchema, "query");

    it("should pass with valid query parameter", () => {
      const req = { query: { q: "bengal" } } as unknown as Request;

      middleware(req, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.locals!.validated).toEqual({ q: "bengal" });
    });

    it("should throw ValidationError when q is missing", () => {
      const req = { query: {} } as unknown as Request;

      expect(() => middleware(req, mockRes as Response, mockNext)).toThrow(ValidationError);
    });
  });

  describe("breedIdParamSchema (params source)", () => {
    const middleware = validate(breedIdParamSchema, "params");

    it("should pass with valid breed_id param", () => {
      const req = { params: { breed_id: "beng" } } as unknown as Request;

      middleware(req, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.locals!.validated).toEqual({ breed_id: "beng" });
    });

    it("should throw ValidationError for invalid breed_id format", () => {
      const req = { params: { breed_id: "INVALID" } } as unknown as Request;

      expect(() => middleware(req, mockRes as Response, mockNext)).toThrow(ValidationError);
    });
  });
});

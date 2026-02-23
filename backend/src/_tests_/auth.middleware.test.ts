import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { UnauthorizedError } from "../errors/unauthorized.error";

describe("Auth Middleware", () => {
  const mockRes = {} as Response;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw UnauthorizedError when no authorization header", () => {
    const req = { headers: {} } as AuthRequest;

    expect(() => authMiddleware(req, mockRes, mockNext)).toThrow(
      UnauthorizedError
    );
    expect(() => authMiddleware(req, mockRes, mockNext)).toThrow(
      "Authentication required"
    );
  });

  it("should throw UnauthorizedError when token is invalid", () => {
    const req = {
      headers: { authorization: "Bearer invalid-token" },
    } as AuthRequest;

    expect(() => authMiddleware(req, mockRes, mockNext)).toThrow(
      UnauthorizedError
    );
    expect(() => authMiddleware(req, mockRes, mockNext)).toThrow(
      "Invalid or expired token"
    );
  });

  it("should set req.user and call next for valid token", () => {
    const payload = { id: "user123", email: "ale@test.com" };
    const token = jwt.sign(payload, process.env["JWT_SECRET"]!);
    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as AuthRequest;

    authMiddleware(req, mockRes, mockNext);

    expect(req.user).toMatchObject(payload);
    expect(mockNext).toHaveBeenCalled();
  });
});

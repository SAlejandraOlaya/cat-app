import { registerUser, loginUser, getUserById } from "../services/user.service";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ConflictError } from "../errors/conflict.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { NotFoundError } from "../errors/not-found.error";

jest.mock("../models/user.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (jwt.sign as jest.Mock).mockReturnValue("mocked-jwt-token");
  });

  describe("registerUser", () => {
    it("should register a new user and return a token", async () => {
      const mockUser = {
        name: "Alejandra",
        email: "ale@test.com",
        password: "123456",
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");

      const mockSave = jest.fn().mockResolvedValue(undefined);
      const mockToObject = jest.fn().mockReturnValue({
        _id: "user123",
        name: "Alejandra",
        email: "ale@test.com",
        password: "hashedPassword123",
      });

      (User as unknown as jest.Mock).mockImplementation(() => ({
        _id: "user123",
        name: "Alejandra",
        email: "ale@test.com",
        password: "hashedPassword123",
        save: mockSave,
        toObject: mockToObject,
      }));

      const result = await registerUser(mockUser);

      expect(User.findOne).toHaveBeenCalledWith({ email: "ale@test.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
      expect(mockSave).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toMatchObject({
        name: "Alejandra",
        email: "ale@test.com",
        token: "mocked-jwt-token",
      });
      expect(result).not.toHaveProperty("password");
    });

    it("should throw ConflictError if user already exists", async () => {
      const mockUser = {
        name: "Alejandra",
        email: "ale@test.com",
        password: "123456",
      };

      (User.findOne as jest.Mock).mockResolvedValue({ email: "ale@test.com" });

      await expect(registerUser(mockUser)).rejects.toThrow(ConflictError);
      await expect(registerUser(mockUser)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("loginUser", () => {
    it("should login successfully and return a token", async () => {
      const mockUserFromDB = {
        _id: "user123",
        name: "Alejandra",
        email: "ale@test.com",
        password: "hashedPassword123",
        toObject: jest.fn().mockReturnValue({
          _id: "user123",
          name: "Alejandra",
          email: "ale@test.com",
          password: "hashedPassword123",
        }),
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUserFromDB);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginUser("ale@test.com", "123456");

      expect(User.findOne).toHaveBeenCalledWith({ email: "ale@test.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "123456",
        "hashedPassword123"
      );
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toMatchObject({
        name: "Alejandra",
        email: "ale@test.com",
        token: "mocked-jwt-token",
      });
      expect(result).not.toHaveProperty("password");
    });

    it("should throw UnauthorizedError if user is not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        loginUser("noexiste@test.com", "123456")
      ).rejects.toThrow(UnauthorizedError);
    });

    it("should throw UnauthorizedError if password is invalid", async () => {
      const mockUserFromDB = {
        _id: "user123",
        email: "ale@test.com",
        password: "hashedPassword123",
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUserFromDB);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        loginUser("ale@test.com", "wrongpassword")
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("getUserById", () => {
    it("should return user without password", async () => {
      const mockSelect = jest.fn().mockResolvedValue({
        toObject: () => ({
          _id: "user123",
          name: "Alejandra",
          email: "ale@test.com",
        }),
      });
      (User.findById as jest.Mock).mockReturnValue({ select: mockSelect });

      const result = await getUserById("user123");

      expect(User.findById).toHaveBeenCalledWith("user123");
      expect(result).toEqual({
        _id: "user123",
        name: "Alejandra",
        email: "ale@test.com",
      });
    });

    it("should throw NotFoundError if user does not exist", async () => {
      const mockSelect = jest.fn().mockResolvedValue(null);
      (User.findById as jest.Mock).mockReturnValue({ select: mockSelect });

      await expect(getUserById("nonexistent")).rejects.toThrow(NotFoundError);
    });
  });
});

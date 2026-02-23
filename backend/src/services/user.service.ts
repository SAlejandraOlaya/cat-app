import {
  IUser,
  IUserResponse,
  IAuthResponse,
} from "../interfaces/user.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { ConflictError } from "../errors/conflict.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { NotFoundError } from "../errors/not-found.error";
import { generateToken } from "../config/jwt";

export const registerUser = async (user: IUser): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  await newUser.save();

  const { password, ...userWithoutPassword } = newUser.toObject();
  const token = generateToken({
    id: newUser._id.toString(),
    email: newUser.email,
  });

  return { ...userWithoutPassword, token } as IAuthResponse;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError();
  }

  const { password: _, ...userWithoutPassword } = user.toObject();
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  return { ...userWithoutPassword, token } as IAuthResponse;
};

export const getUserById = async (id: string): Promise<IUserResponse> => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new NotFoundError("User");
  }
  return user.toObject() as IUserResponse;
};

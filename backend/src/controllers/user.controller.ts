import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });
  res.status(201).json(user);
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  res.status(200).json(user);
};

export const getProfileController = async (req: AuthRequest, res: Response) => {
  const user = await getUserById(req.user!.id);
  res.status(200).json(user);
};

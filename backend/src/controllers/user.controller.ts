import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { registerSchema, loginSchema } from "../dtos/auth.dto";
import { getValidated } from "../middlewares/validate.middleware";

export const registerUserController = async (_req: Request, res: Response) => {
  const { name, email, password } = getValidated(res, registerSchema);
  const user = await registerUser({ name, email, password });

  res.status(201).json(user);
};

export const loginUserController = async (_req: Request, res: Response) => {
  const { email, password } = getValidated(res, loginSchema);
  const user = await loginUser(email, password);

  res.status(200).json(user);
};

export const getProfileController = async (req: AuthRequest, res: Response) => {
  const user = await getUserById(req.user!.id);

  res.status(200).json(user);
};

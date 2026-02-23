import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getProfileController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../dtos/auth.dto";

const router = Router();

router.post("/register", validate(registerSchema), registerUserController);
router.post("/login", validate(loginSchema), loginUserController);
router.get("/profile", authMiddleware, getProfileController);

export default router;

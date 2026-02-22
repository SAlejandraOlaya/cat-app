import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user.service";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const user = await registerUser({ name, email, password });
        res.status(201).json(user);
    } catch (error: any) {
        if (error.message === 'User already exists') {
            res.status(409).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error.message });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const user = await loginUser(email, password);
        res.status(200).json(user);
    } catch (error: any) {

        if (error.message === 'Invalid credentials') {
            res.status(401).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error.message });
    }
}


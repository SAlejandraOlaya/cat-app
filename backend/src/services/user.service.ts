import { IUser, IUserResponse } from "../interfaces/user.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const registerUser = async (user: IUser): Promise<IUserResponse> => {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = new User(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword as IUserResponse;
}

export const loginUser = async (email: string, password: string): Promise<IUserResponse> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword as IUserResponse;
}
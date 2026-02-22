
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import catRoutes from "./routes/cat.routes";
import imageRoutes from "./routes/image.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', catRoutes)
app.use('/api', imageRoutes)
app.use('/api', userRoutes)